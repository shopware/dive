import { COMEntityType } from './COMEntityType';

export type COMBaseEntity = {
    id: string;
    name: string;
    entityType: COMEntityType;
    visible: boolean;
    parentId?: string | null;
};
