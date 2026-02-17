/**
 * Web Worker body for STEP/IGES parsing via occt-import-js.
 * This function is stringified and injected into a blob worker
 * (same pattern as DracoWorker). The occt-import-js JS is
 * concatenated before this code, making `occtimportjs` available
 * as a global.
 */
export function STEPWorker() {
    let occtPending = null;
    let wasmUrl = null;

    const STEP_SCHEMA_NORMALIZATIONS = [
        [
            /'CONFIG_CONTROL_DESIGN'\s*\)/g,
            "'AP203_CONFIGURATION_CONTROLLED_3D_DESIGN_OF_MECHANICAL_PARTS_AND_ASSEMBLIES_MIM_LF')",
        ],
        [
            /'AP242_MANAGED_MODEL_BASED_3D_ENGINEERING_MIM_LF\.\s*\{[\s\S]*?\}\s*'/g,
            "'AP242_MANAGED_MODEL_BASED_3D_ENGINEERING_MIM_LF'",
        ],
    ];

    function getOcct() {
        if (!occtPending) {
            occtPending = occtimportjs({ // eslint-disable-line no-undef
                locateFile: function () {
                    return wasmUrl;
                },
            });
        }
        return occtPending;
    }

    function normalizeStepSchema(buffer) {
        var decoder = new TextDecoder('utf-8', { fatal: false });
        var encoder = new TextEncoder();
        var text = decoder.decode(buffer);
        for (var i = 0; i < STEP_SCHEMA_NORMALIZATIONS.length; i++) {
            var pattern = STEP_SCHEMA_NORMALIZATIONS[i][0];
            var replacement = STEP_SCHEMA_NORMALIZATIONS[i][1];
            text = text.replace(pattern, replacement);
        }
        return new Uint8Array(encoder.encode(text));
    }

    function parseStepWithFallback(occt, fileBuffer) {
        var normalized = normalizeStepSchema(fileBuffer);
        try {
            var result = occt.ReadStepFile(normalized, null);
            if (result.success && result.root) return result;
        } catch (e) {
            // fallback to original
        }
        try {
            return occt.ReadStepFile(fileBuffer, null);
        } catch (e) {
            return {
                success: false,
                root: { meshes: [], children: [] },
                meshes: [],
            };
        }
    }

    onmessage = async function (e) {
        var message = e.data;

        switch (message.type) {
            case 'init':
                wasmUrl = message.wasmUrl;
                break;

            case 'parse':
                try {
                    var occt = await getOcct();
                    var fileBuffer = new Uint8Array(message.buffer);
                    var fileType = message.fileType;
                    var result;

                    if (fileType === 'step' || fileType === 'stp') {
                        result = parseStepWithFallback(occt, fileBuffer);
                    } else {
                        result = occt.ReadIgesFile(fileBuffer, null);
                    }

                    if (!result.success || !result.root) {
                        self.postMessage({
                            type: 'error',
                            id: message.id,
                            error: 'Failed to parse CAD file',
                        });
                        return;
                    }

                    self.postMessage({
                        type: 'result',
                        id: message.id,
                        result: result,
                    });
                } catch (err) {
                    self.postMessage({
                        type: 'error',
                        id: message.id,
                        error: err instanceof Error ? err.message : String(err),
                    });
                }
                break;
        }
    };
}
