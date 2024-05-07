import shift from "../helper/shift.ts";

export default function truncateExp(number: number, decimals: number = 0): number {
    const n = shift(number, +decimals);
    return shift(Math.trunc(n), -decimals);
}