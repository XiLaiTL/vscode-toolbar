import { Activate } from "./activate";
import { Tool } from "./tool";

export interface ToolboxLayer{
    icon?: string,
    name: string,
    id?: string,
    description?: string
    activate?: Activate,
    tools:Tool[]
}