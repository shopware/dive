export default function shift(value: number, exponent: number): number {
    const subvalues = (value + 'e').split('e');
    return +(subvalues[0] + 'e' + (+subvalues[1] + (exponent || 0)));
}