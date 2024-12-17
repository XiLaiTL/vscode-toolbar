import { deserializeAction, actions, Action } from "../action/action";
import { readMarkdownToolAction } from "../action/markdown/markdown_action";
import { Tool } from "../model/tool";
import { Toolbox, clearToolboxs, toolboxs } from "../model/toolbox";
import { BigMap } from "../utilities/big_map";
import { views } from "../view/view";
import { getConfig } from "./configuration";
import { latexToolbox } from "./latex_config";
import { markdownToolbox } from "./markdown_config";
import * as vscode from 'vscode';

export function readActions(): void;
export function readActions(configActions: []): void;
export function readActions(configActions?: []): void{
    const customActions = configActions ? configActions : getConfig("actions", [{}]);
    for (const custom of customActions) {
        try {
            const action = custom as Action;
            if (action.name) {
                actions[action.name] = deserializeAction(action);
            }
        }
        finally{ }
    }
}

export function readToolboxs(): void;
export function readToolboxs(configToolboxs: []): void;
export function readToolboxs(configToolboxs?: []): void {
    clearToolboxs();
    if (getConfig("builtin.markdown.activate",Boolean(true))) {
        readToolbox(markdownToolbox);
    }
    if (getConfig("builtin.latex.activate",Boolean(true))) {
        readToolbox(latexToolbox);
    }
    readMarkdownToolAction();
    const customToolboxs = configToolboxs ? configToolboxs : getConfig("toolboxs", [{}]);
    for (const custom of customToolboxs) {
        try {
            const toolbox = custom as Toolbox;
            if (toolbox.activate !== false) {
                readToolbox(toolbox);
            }
        }
        finally {  }
    }
}




function readToolbox(toolbox: Toolbox) {
    for (const layer of toolbox.layers) {
        if (layer.activate === undefined) { layer.activate = toolbox.activate; }
        layer.id ="layer_" + BigMap.get(toolbox.name + "|" + layer.name);
        for (const tool of layer.tools) {
            if (tool.activate === undefined) { tool.activate = layer.activate; }
            tool.id = "tool_" + BigMap.get(toolbox.name + "|" + layer.name + "|" + tool.name);
            readToolAction(tool);
        }
    }
    if (!views[toolbox.view]) {
        views[toolbox.view] = { title: toolbox.name };
    }
    else {
        views[toolbox.view].title = `${views[toolbox.view].title} & ${toolbox.name}`;
    }
    toolboxs[toolbox.view].push(toolbox);
}

function readToolAction(tool: Tool) {
    if (tool.actions.length === 1 && typeof tool.actions[0] === "string") {
        return;
    }
    const covertedActions = tool.actions.map((action) => deserializeAction(action));
    // multi-action button combine to single one
    actions[`TOOL:${tool.id}`] = covertedActions.length === 1
        ? covertedActions[0]
        : async () => {
            for (const action of covertedActions) {
                await action();
            }
        };
}