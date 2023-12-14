
import { Action } from "../action/action";
import { Activate } from "./activate";

export interface Tool{
    icon?: string,
    name: string,
    id?: string,
    description?: string,
    actions: (string|Action)[],
    activate?: Activate,
}

export function getActionName(tool: Tool): string {
    return tool.actions.length === 1 && typeof tool.actions[0] === "string"  
        ? tool.actions[0]
        : `TOOL:${tool.id}`;
}

