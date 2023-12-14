import { registers } from "../config/id";
import { Activate, ActivateArgument } from "./activate";
import { ToolboxLayer } from "./layer";

export const toolboxs: { [viewKey: string]: Toolbox[] } = {};

export function clearToolboxs() {
    const viewKeys = Object.keys(registers.views);
    for (const viewKey of viewKeys) {
        toolboxs[viewKey] = [];
    }
} 

export interface Toolbox{
    name: string,
    layers: ToolboxLayer[],
    view: string,
    activate: Activate
}

