import { Vector3 } from "three";

/**
 * Calculate the signed angle between two vectors. Only works when the vectors are on the same plane.
 * @param vecB Start Vector
 * @param vecA Target Vector
 * @param planeNormal The vector's plane normal
 * @returns Signed angle in radians
 */

export default function signedAngleTo(vecA: Vector3, vecB: Vector3, planeNormal: Vector3): number {
    return Math.atan2(vecA.clone().cross(vecB).dot(planeNormal), vecB.clone().dot(vecA));
}