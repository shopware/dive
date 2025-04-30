import { type COMPov } from './COMPov.ts';
import { type COMLight } from './COMLight.ts';
import { type COMModel } from './COMModel.ts';
import { type COMPrimitive } from './COMPrimitive.ts';
import { type COMGroup } from './COMGroup.ts';

export type COMEntity = COMPov | COMLight | COMModel | COMPrimitive | COMGroup;
