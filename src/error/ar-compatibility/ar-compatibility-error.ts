export class ARCompatibilityError extends Error {
    public readonly browserInfo: {
        userAgent: string;
        platform: string;
        vendor: string;
        browser: string;
        version: string;
        os: string;
        osVersion: string;
    };

    constructor(
        baseMessage: string,
        userAgent: string,
        platform: string,
        vendor: string,
    ) {
        // Parse browser information
        const browserMatch = userAgent.match(
            /(Chrome|Safari|Firefox|Edge)\/(\d+\.\d+)/,
        );
        const browser = browserMatch ? browserMatch[1] : 'Unknown';
        const version = browserMatch ? browserMatch[2] : 'Unknown';

        // Parse OS information
        const osMatch = userAgent.match(/\((.*?)\)/);
        const osInfo = osMatch ? osMatch[1] : 'Unknown';
        const osVersion = osInfo.match(/OS (\d+_\d+)/)?.[1] || 'Unknown';
        const os = determineOS(osInfo);

        // Build detailed error message based on detected information
        let detailedMessage = baseMessage;

        if (os === 'iOS' || os === 'iPadOS') {
            if (browser !== 'Safari') {
                detailedMessage += ` ARQuickLook is only supported in Safari browser. Current browser: ${browser} ${version}`;
            } else if (parseFloat(osVersion.replace('_', '.')) < 13.0) {
                detailedMessage += ` ARQuickLook requires iOS/iPadOS 13.0 or later. Current version: ${osVersion}`;
            }
        }

        super(detailedMessage);
        this.name = 'ARCompatibilityError';

        // Store the browser information
        this.browserInfo = {
            userAgent,
            platform,
            vendor,
            browser,
            version,
            os,
            osVersion,
        };
    }
}

function determineOS(osInfo: string): string {
    if (osInfo.includes('iPhone')) {
        return 'iOS';
    }
    if (osInfo.includes('iPad')) {
        return 'iPadOS';
    }
    if (osInfo.includes('Macintosh')) {
        return 'macOS';
    }
    return 'Unknown';
}
