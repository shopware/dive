import { GeometryTypeSchema } from './GeometryTypeSchema.ts';
export type GeometrySchema = {
    name: GeometryTypeSchema;
    width: number;
    height: number;
    depth: number;
};
