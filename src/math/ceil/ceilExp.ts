import shift from "../helper/shift.ts";

export default function ceilExp(number: number, decimals: number = 0): number {
    const n = shift(number, +decimals);
    return shift(Math.ceil(n), -decimals);
}