import * as vscode from 'vscode';
import { getSelectionRange, insertSnippet } from '../text_utils';
import { checkUrl } from '../../utilities/url_utils';
import { usefulEditor } from '../../utilities/active_editor';

//the position of link set to $1
export async function insertLinkSnippet(snippet: string, replaceholder:string[]) { 
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor) { return; }
    const range = getSelectionRange(editor);
    const selected = (range)? editor.document.getText(range) : "";
    // let selectedRegexString = selected.replaceAll("(", "\\(").replaceAll(")", "\\)");
    // selectedRegexString = checkUrl(selected.trim()) ? `(${selectedRegexString})()` : `()(${selectedRegexString})`;
    // //use self string as regex to replace self with snippet, and then self string will turn to be $1 into res
    // const selectedRegex = new RegExp(selectedRegexString, "g");
    // const res = selected.replaceAll(selectedRegex, snippet);
    const checked = checkUrl(selected.trim());
    let res = snippet.replaceAll("$1", checked ? selected : replaceholder[0]).replaceAll("$2", checked ? replaceholder[1] : selected);
    for (let i = 2; i < replaceholder.length; i++){
        res = res.replaceAll(`$${i+1}`, replaceholder[i]);
    }
    await insertSnippet(res);
} 

const linkRegex = /!?\[(.*?)\](?:\(.*?\)|\[.*?\])/g;
const footnotesRegex = /\[\^(.*?)\]/g;
export async function deleteLink() {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor) { return; }
    const range = getSelectionRange(editor,"line");
    if (!range) { return; }
    const selected = editor.document.getText(range) ;
    const res = selected.replaceAll(linkRegex, "$1").replaceAll(footnotesRegex, "$1");
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        editBuilder.replace(range, res);
    });
}


export async function insertFooter(snippet: string, footerSnippet: string, replaceholder: string[]) {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor) { return; }
    const range = getSelectionRange(editor);
    const selected = (range) ? editor.document.getText(range) : "";
    const checked = checkUrl(selected.trim());
    let res1 = snippet.replaceAll("$1", checked ? selected : replaceholder[0]).replaceAll("$2", checked ? replaceholder[1] : selected);
    let res2 = footerSnippet.replaceAll("$1", checked ? selected : replaceholder[0]).replaceAll("$2", checked ? replaceholder[1] : selected);
    for (let i = 2; i < replaceholder.length; i++){
        res1 = res1.replaceAll(`$${i+1}`, replaceholder[i]);
        res2 = res2.replaceAll(`$${i+1}`, replaceholder[i]);
    }
    await editor.insertSnippet(new vscode.SnippetString(res1));
    await editor.insertSnippet(new vscode.SnippetString(`\n${res2}`),editor.document.lineAt(editor.document.lineCount-1).range.end);
}


export async function insertPath() {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor) { return; }
    const uris = await vscode.window.showOpenDialog({ canSelectFiles: true,  canSelectMany: false });
    if (uris && uris[0]) {
        //editor.document.uri.fsPath
        await editor.insertSnippet(new vscode.SnippetString(uris[0].fsPath));
    }
}
