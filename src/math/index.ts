import ceilExp from './ceil/ceilExp.ts';
import floorExp from './floor/floorExp.ts';
import roundExp from './round/roundExp.ts';
import signedAngleTo from './signedAngleTo/signedAngleTo.ts';
import toFixedExp from './toFixed/toFixedExp.ts';
import truncateExp from './truncate/truncateExp.ts';
import radToDeg from './radToDeg/radToDeg.ts';
import degToRad from './degToRad/degToRad.ts';

export const DiveMath: {
    ceilExp: typeof ceilExp;
    floorExp: typeof floorExp;
    roundExp: typeof roundExp;
    toFixedExp: typeof toFixedExp;
    truncateExp: typeof truncateExp;
    signedAngleTo: typeof signedAngleTo;
    radToDeg: typeof radToDeg;
    degToRad: typeof degToRad;
} = {
    ceilExp,
    floorExp,
    roundExp,
    toFixedExp,
    truncateExp,
    signedAngleTo,
    radToDeg,
    degToRad,
};
