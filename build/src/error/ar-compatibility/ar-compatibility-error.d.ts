export declare class ARCompatibilityError extends Error {
    readonly browserInfo: {
        userAgent: string;
        platform: string;
        vendor: string;
        browser: string;
        version: string;
        os: string;
        osVersion: string;
    };
    constructor(baseMessage: string, userAgent: string, platform: string, vendor: string);
}
