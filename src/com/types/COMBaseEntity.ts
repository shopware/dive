export type COMBaseEntity = {
    id: string;
    name: string;
    entityType: 'pov' | 'light' | 'model' | 'primitive';
    visible: boolean;
}