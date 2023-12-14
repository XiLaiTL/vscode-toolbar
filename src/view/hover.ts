import * as vscode from "vscode";
import { selectionContains } from "../action/text_utils";
import { Toolbox, toolboxs } from "../model/toolbox";
import { toolboxMarkdown } from "./content/markdown";
import { intersectionList } from "../utilities/list_utils";

export function registerHovers(context: vscode.ExtensionContext,canLanguages: string[] = []) {
    const toolboxList = Object.values(toolboxs).flatMap(e => e);
    for (const toolbox of toolboxList) {
        const list = typeof toolbox.activate === "boolean"
            ? (toolbox.activate ? canLanguages : [])
            : intersectionList(toolbox.activate.languages, canLanguages);
        if (list.length > 0) {
            registerToolboxHover(context,toolbox, list);
        }
    }
}

function registerToolboxHover(context: vscode.ExtensionContext,toolbox:Toolbox, canLanguages: string[] = []) {
    const hoverProviderDisposable = vscode.languages.registerHoverProvider(canLanguages, {
        async provideHover(document, position, token) {
            let hover = await toolboxHover({ document, position, _token: token },toolbox,document.languageId);
            return hover;
        }
    });
    context.subscriptions.push(hoverProviderDisposable);
}


async function toolboxHover(
    { document, position, _token }: { document: vscode.TextDocument; position: vscode.Position; _token: vscode.CancellationToken; },
    toolbox: Toolbox,
    language: string
): Promise<vscode.Hover | null> {
    const uri = document.uri.toString();
    const range = selectionContains(uri, position);
    if (!range ) { return null; }
    const markdowns = toolboxMarkdown(toolbox, language);
    for (const markdown of markdowns) {
        markdown.isTrusted = true;
    }
    const hover = new vscode.Hover(markdowns, range);
    return hover;
}

/*https://github.com/intellism/vscode-comment-translate */
function getHoverId(document: vscode.TextDocument, position: vscode.Position) {
    return  `${document.uri.toString()}-${position.line}-${position.character}`;
}