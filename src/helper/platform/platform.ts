import { EPlatform } from "../../constant/EPlatform";

export const getPlatform: () => EPlatform = () => {
    if (navigator.userAgent) {
        if (navigator.userAgent.includes('Macintosh')) return EPlatform.MAC;
        if (navigator.userAgent.includes('Windows')) return EPlatform.WINDOWS;
        if (navigator.userAgent.includes('Linux')) return EPlatform.LINUX;
    }

    if (navigator.platform.includes('Mac')) return EPlatform.MAC;
    if (navigator.platform.includes('Win')) return EPlatform.WINDOWS;
    if (navigator.platform.includes('Linux')) return EPlatform.LINUX;
    return EPlatform.UNKNOWN;
}

export const isMac: () => boolean = () => getPlatform() === EPlatform.MAC;
export const isWindows: () => boolean = () => getPlatform() === EPlatform.WINDOWS;
export const isLinux: () => boolean = () => getPlatform() === EPlatform.LINUX;