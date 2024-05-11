import ceilExp from "./ceil/ceilExp.ts";
import floorExp from "./floor/floorExp.ts";
import roundExp from "./round/roundExp.ts";
import toFixedExp from "./toFixed/toFixedExp.ts";
import truncateExp from "./truncate/truncateExp.ts";

export const DIVEMath: {
    ceilExp: typeof ceilExp;
    floorExp: typeof floorExp;
    roundExp: typeof roundExp;
    toFixedExp: typeof toFixedExp;
    truncateExp: typeof truncateExp;
} = {
    ceilExp,
    floorExp,
    roundExp,
    toFixedExp,
    truncateExp,
}