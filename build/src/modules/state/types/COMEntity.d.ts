import { COMPov } from './COMPov.ts';
import { COMLight } from './COMLight.ts';
import { COMModel } from './COMModel.ts';
import { COMPrimitive } from './COMPrimitive.ts';
import { COMGroup } from './COMGroup.ts';
export type COMMinimal<T extends COMEntity> = T extends COMEntity ? {
    id: string;
    entityType: T['entityType'];
} : never;
export type COMPartial<T extends COMEntity | void = void> = T extends COMEntity ? COMMinimal<T> & Partial<T> : COMMinimal<COMEntity> & Partial<COMEntity>;
export type COMEntity = COMPov | COMLight | COMModel | COMPrimitive | COMGroup;
