import ceilExp from "./ceil/ceilExp.ts";
import floorExp from "./floor/floorExp.ts";
import roundExp from "./round/roundExp.ts";
import signedAngleTo from "./signedAngleTo/signedAngleTo.ts";
import toFixedExp from "./toFixed/toFixedExp.ts";
import truncateExp from "./truncate/truncateExp.ts";

export const DIVEMath: {
    ceilExp: typeof ceilExp;
    floorExp: typeof floorExp;
    roundExp: typeof roundExp;
    toFixedExp: typeof toFixedExp;
    truncateExp: typeof truncateExp;
    signedAngleTo: typeof signedAngleTo;
} = {
    ceilExp,
    floorExp,
    roundExp,
    toFixedExp,
    truncateExp,
    signedAngleTo,
}