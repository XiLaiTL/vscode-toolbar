import { title } from "process";
import { getConfig, saveConfig } from "../../config/configuration";
import { ToolboxLayer } from "../../model/layer";
import { Toolbox } from "../../model/toolbox";
import * as vscode from 'vscode';
import { Tool } from "../../model/tool";
import { usefulEditor } from "../../utilities/active_editor";

export async function addTool(tool:Tool) {
    const toolboxs = getConfig<Toolbox[]>("toolboxs", []);
    let toolbox:Toolbox|undefined = undefined;
    for (toolbox of toolboxs) {
        if (toolbox.name === "Latex Custom") {
            break;
        }
    }
    if (!toolbox||toolbox.name !== "Latex Custom") {
        toolbox = {
            "name": "Latex Custom",
            "view": "latex",
            "activate": {
                "languages": ["latex"],
                "hover": true,
            },
            "layers": []
        };
        toolboxs.push(toolbox);
    }
    let layer: ToolboxLayer | undefined = undefined;
    for (layer of toolbox.layers) {
        if (layer.tools.length <= 5) {
            break;
        }
    }
    if (!layer || layer.tools.length > 5) {
        const name = toolbox.layers.length + 1;
        layer = {
            "name": `${name}`,
            "icon": `$${name}`,
            "tools": []
        };
        toolbox.layers.push(layer);
    }
    const name = layer.tools.length + 1;
    const button_name = await vscode.window.showInputBox({ placeHolder: `btn${name}`, title: "The name of the button" })
    const final_name = button_name ? button_name : `btn${name}`;
    tool.name = final_name;
    layer.tools.push(tool);
    await saveConfig("toolboxs", toolboxs);
}

export async function addInsertTool() {
    const editor = usefulEditor;
    let content: string | undefined = undefined;
    if (!editor) {
        content = await vscode.window.showInputBox({prompt:"The content you need to insert", title: "The content you need to insert" });
        if (!content) {return;}
    }
    else {
        vscode.window.showInformationMessage(`Please use "\${1:title} \${2:something} ..." and then "$1 $2 ..." as the placeholder.`);
        const choice = await vscode.window.showWarningMessage(`Adding the *selected content* to button.` , "Go ahead", "Cancel");
        const lines = editor.selections.map(selection => editor.document.getText(selection));
        content = lines.join("");
        if (choice === "Cancel") { return; }
    }
    const tool: Tool = {
        "name": "temp",
        "activate": true,
        "icon": "",
        "actions": [{
            "mode": "insert",
            "argument": content
        }]
    };
    await addTool(tool);
}

export async function addToggleTextTool() {
    const label = await vscode.window.showInputBox({ title: "The label of text,eg:\\textbf{}", placeHolder: "textbf" });
    if (!label) { return; }
    const tool: Tool = {
        "name": "temp",
        "activate": true,
        "icon": "",
        "actions": [{
            "mode": "replace",
            "argument": {
                "start": `\\${label}{`,
                "end":"}"
            }
        }]
    };
    await addTool(tool);
}

export async function addToggleBlockTool() {
    const label = await vscode.window.showInputBox({ title: "The label of block, eg:\\begin{frame}", placeHolder: "frame" });
    if (!label) { return; }
    const extra = (await vscode.window.showInputBox({ title: "The first sentence of block, eg:\\frametitle{}", placeHolder: "\\frametitle{${1:title}}" }))??"";
    const tool: Tool = {
        "name": "temp",
        "activate": true,
        "icon": "",
        "actions": [{
            "mode": "block",
            "argument": {
                "start": `\\begin{${label}}`,
                "label": `${extra}`,
                "end":`\\end{${label}}`
            }
        }]
    };
    await addTool(tool);
}