import shift from "../helper/shift.ts";

export default function toFixedExp(number: number, decimals: number = 0): string {
    const n = shift(number, +decimals);
    return shift(Math.round(n), -decimals).toFixed(decimals);
}