import * as vscode from 'vscode';
import { usefulEditor } from '../utilities/active_editor';

export function getSelectionRange(editor: vscode.TextEditor, mode: "line" | "word" = "word"): vscode.Range | null {
    if (!editor.selection) { return null; }
    // Get current selection or current word
    if (editor.selection.start.isEqual(editor.selection.end)) {
        const range: vscode.Range = (mode === "word")
            ? editor.document.getWordRangeAtPosition(editor.selection.start)!
            : editor.document.lineAt(editor.selection.start.line).range
            ;
        return range;
    }
    else {
        return editor.selection;
    }
}

export function checkForChars(editor: vscode.TextEditor, chars: String, outsideRange: vscode.Range, insideRange: vscode.Range): [boolean, vscode.Range | null] {
	let charsFound: boolean = true;
	let range: vscode.Range | null = null;
	if (editor.document.getText(outsideRange) === chars) {
		range = outsideRange;
    }
    else if (editor.document.getText(insideRange) === chars) {
		range = insideRange;
    }
    else {
		charsFound = false;
	}

	return [charsFound, range];
}

export function checkLineChars(chars: string, line: number): boolean{
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor || !editor.selection) { return false; }
    const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, chars.length+2));
    const lineString: string = editor.document.getText(lineRange);
    let check = false;
    for (let i = 1; i <= chars.length; i++){
        if (lineString.substring(0, i) === chars) {
            check = true; break;
        }
    }
    return check;
}

export function getCurrentPostion() {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor || !editor.selection) { return; }
    return `${editor.selection.start.line + 1}_${editor.selection.start.character + 1}`;
}

export async function insertSnippet(snippet: string):Promise<void> {
	const editor: vscode.TextEditor | undefined = usefulEditor;
    editor?.insertSnippet(new vscode.SnippetString(snippet));
}

export function selectionContains(url: string, position: vscode.Position): vscode.Selection | null {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    // have editor and request uri equal 有活动editor，并且打开文档与请求文档一致时处理请求
    if (!editor || editor.document.uri.toString() !== url) { return null; }
    // position -> selection 类型转换
    let selection = editor.selections.find((selection) =>  !selection.isEmpty && selection.contains(position));
    if (selection) { return selection; }
    else { return null; }
}
