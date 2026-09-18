import { type ColorRepresentation } from 'three/webgpu';

/**
 * What a grid preset settles: how the two kinds of line read against the ground
 * they sit on, and nothing else.
 *
 * Opacity rather than a paler color, because paler only works in one direction:
 * on a dark ground the way to a quieter line is darker, on a light one it is
 * lighter, and opacity is the same move on both. It is also the only one open
 * to a transparent canvas, where the ground is a page the engine cannot read.
 */
export type DIVEGridColors = {
    /** Color of the minor grid lines. */
    minorLineColor: ColorRepresentation;
    /** Color of the major grid lines. */
    majorLineColor: ColorRepresentation;
    /** How opaque the minor grid lines are drawn, 0 to 1. */
    minorLineOpacity: number;
    /** How opaque the major grid lines are drawn, 0 to 1. */
    majorLineOpacity: number;
};

/**
 * Lines for a grid that sits on something light -- a white floor, or a page in
 * its light theme.
 *
 * The minor lines carry the pattern and the major ones the reading of it, so
 * the two are a step apart rather than a shade: close together they read as one
 * grid drawn badly.
 */
export const DIVEGridOnLightColors: DIVEGridColors = {
    minorLineColor: '#a7a7a7',
    majorLineColor: '#5c5c5c',
    minorLineOpacity: 0.58,
    majorLineOpacity: 1,
};

/**
 * Lines for a grid that sits on something dark -- a dark floor, or a page in
 * its dark theme.
 *
 * Lighter than the ground rather than darker, and by less than the light
 * preset's step: on a dark ground the same contrast reads louder, and a grid
 * that shouts is furniture drawing attention to itself.
 */
export const DIVEGridOnDarkColors: DIVEGridColors = {
    minorLineColor: '#5c5c5c',
    majorLineColor: '#c5c5c5',
    minorLineOpacity: 0.58,
    majorLineOpacity: 1,
};

/**
 * Lines that hold on either ground, for a viewer that does not know which it is
 * standing on.
 *
 * A compromise by construction: mid grey never disappears into white or into
 * black, and never reads as well on either as the preset made for it.
 */
export const DIVEGridOnAnyColors: DIVEGridColors = {
    minorLineColor: '#808080',
    majorLineColor: '#a8a8a8',
    minorLineOpacity: 0.58,
    majorLineOpacity: 1,
};
