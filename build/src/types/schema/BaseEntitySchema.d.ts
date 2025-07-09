import { EntityTypeSchema } from './EntityTypeSchema.ts';
export type BaseEntitySchema = {
    id: string;
    name: string;
    entityType: EntityTypeSchema;
    visible: boolean;
    parentId?: string | null;
};
