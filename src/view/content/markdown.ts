import * as vscode from "vscode";
import { registers } from "../../config/id";
import { Tool, getActionName } from "../../model/tool";
import { ToolboxLayer } from "../../model/layer";
import { checkActivated } from "../../model/activate";
import { Toolbox } from "../../model/toolbox";

const SPACE = '&nbsp;&nbsp;';
const SEPARATOR = `${SPACE}|${SPACE}`;
const CODE_DEFINE = '```';
const ICON_TEXT = /^\$/;
const ICON_SUBSCRIPT = /^#(.+)\{(.+)\}$/;
const ICON_SVG = /^<svg.+<\/svg>$/;

export function iconToVsCodeStyle(name: string, icon: string | undefined) {
    const matches = icon?.match(ICON_SUBSCRIPT);
    if (matches) { 
        if (ICON_SVG.test(matches[2])) {
            return matches[1];
        }
        return icon?.replace(ICON_SUBSCRIPT, "$1:$2");
    }
    return (!icon) ? name
        : (ICON_TEXT.test(icon)) ? icon.replace(ICON_TEXT, "")
        : `$(${icon})`;
}

export function toolMarkdown(tool: Tool): string  {
    const args = [getActionName(tool)];
    const icon = iconToVsCodeStyle(tool.name, tool.icon);
    const description = tool.description ? `${tool.name}: ${tool.description}` : tool.name;
    const commandUri = vscode.Uri.parse(
        `command:${registers.commands.toggle}?${encodeURIComponent(JSON.stringify(args))}`
    );
    return `[${icon}](${commandUri} "${description}")`;
}

export function toolboxLayerMarkdown(toolboxLayer: ToolboxLayer, language: string): vscode.MarkdownString {
    const layerIcon = iconToVsCodeStyle(toolboxLayer.name, toolboxLayer.icon);
    const res = toolboxLayer.tools
        .filter(tool => checkActivated(tool.activate, language,true))
        .map(tool => toolMarkdown(tool))
        .join(`${SPACE}`);
    return new vscode.MarkdownString(`${layerIcon}${SPACE}${res}`, true);
}

export function toolboxMarkdown(toolbox: Toolbox, language: string): vscode.MarkdownString[] {
    return toolbox.layers
        .filter(layer => checkActivated(layer.activate, language,true))
        .map(layer => toolboxLayerMarkdown(layer, language));
}

