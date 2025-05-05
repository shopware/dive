import { COMPov } from './COMPov.ts';
import { COMLight } from './COMLight.ts';
import { COMModel } from './COMModel.ts';
import { COMPrimitive } from './COMPrimitive.ts';
import { COMGroup } from './COMGroup.ts';
export type COMEntity = COMPov | COMLight | COMModel | COMPrimitive | COMGroup;
