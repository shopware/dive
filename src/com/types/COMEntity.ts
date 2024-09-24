import { type COMPov } from "./COMPov";
import { type COMLight } from "./COMLight";
import { type COMModel } from "./COMModel";
import { type COMPrimitive } from "./COMPrimitive";
import { type COMGroup } from "./COMGroup";

export type COMEntity = COMPov | COMLight | COMModel | COMPrimitive | COMGroup;