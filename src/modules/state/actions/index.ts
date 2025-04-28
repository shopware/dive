// define global action classes
declare global {
    interface ActionClasses {}
}

// define global actions object
export const Actions = {} as ActionClasses;

// export all types
export * from './types.ts';

// export all actions
export * from './ar/index.ts';
export * from './camera/index.ts';
export * from './media/index.ts';
export * from './object/index.ts';
export * from './renderer/index.ts';
export * from './scene/index.ts';
export * from './toolbox/index.ts';
