/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */

import { ModuleImporter } from './_system/ModuleImporter';

// Re-export the ModuleRegistry as the only public access point
export { ModuleImporter };
