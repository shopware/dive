import { COMEntityType } from './COMEntityType.ts';

export type COMBaseEntity = {
    id: string;
    name: string;
    entityType: COMEntityType;
    visible: boolean;
    parentId?: string | null;
};
