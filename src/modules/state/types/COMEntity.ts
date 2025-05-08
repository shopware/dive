import { type COMPov } from './COMPov.ts';
import { type COMLight } from './COMLight.ts';
import { type COMModel } from './COMModel.ts';
import { type COMPrimitive } from './COMPrimitive.ts';
import { type COMGroup } from './COMGroup.ts';

export type COMMinimal<T extends COMEntity> = T extends COMEntity
    ? { id: string; entityType: T['entityType'] }
    : never;

export type COMPartial<T extends COMEntity | void = void> = T extends COMEntity
    ? COMMinimal<T> & Partial<T>
    : COMMinimal<COMEntity> & Partial<COMEntity>;

export type COMEntity = COMPov | COMLight | COMModel | COMPrimitive | COMGroup;
