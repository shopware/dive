import shift from "../helper/shift.ts";

export default function roundExponential(number: number, decimals: number = 0): number {
    if (number < 0) return -roundExponential(-number, decimals);
    const n = shift(number, +decimals);
    return shift(Math.round(n), -decimals);
};