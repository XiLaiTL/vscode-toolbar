import { usefulEditor } from "../../utilities/active_editor";
import { checkForChars, getSelectionRange } from "../text_utils";
import * as vscode from 'vscode';

export type ReplaceAction = {
    argument: ReplaceActionArgument | string,
    mode: "replace"
};

export interface FindReplaceActionArgument{
    regex: string,
    with: string
}

export interface ReplaceActionArgument{
    start?: string,
    self?: FindReplaceActionArgument | string
    end?: string
}

export async function replace(argus: string|ReplaceActionArgument) {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor) { return; }
    const range = getSelectionRange(editor);
    if (!range) {
        if (typeof argus === "string") {
            await editor.insertSnippet(new vscode.SnippetString(argus));
        }
        else {
            await editor.insertSnippet(new vscode.SnippetString(`${argus.start??""}${argus.self??""}\$0${argus.end??""}`))
        }
        return;
    }
    
    if (typeof argus === "string") {
        await editor.edit((editBuilder) => {
            editBuilder.replace(range, argus as string);
        });
        return;
    }
    const { start, end } = range;
    
    // Check for chars before and after (in and outside word)
    let [charsBefore, beforeRange]: [boolean, vscode.Range | null] = [false, null];
    if (argus.start) {
        const charCount: number = argus.start.length;
        const insideBeforeRange = new vscode.Range(start, start.translate(0, charCount));
        const outsideBeforeRange = new vscode.Range(start.translate(0, -Math.min(start.character, charCount)), start); // Prevent going outside line
        // Check for chars before word
        [charsBefore, beforeRange] = checkForChars(editor, argus.start, outsideBeforeRange, insideBeforeRange);
    }
    let [charsAfter, afterRange]: [boolean, vscode.Range | null] = [false, null];
    if (argus.end) {
        const charCount: number = argus.end.length;
        const insideAfterRange = new vscode.Range(end.translate(0, -charCount), end);
        const outsideAfterRange = new vscode.Range(end, end.translate(0, charCount));
        // Check for chars after word
        [charsAfter, afterRange] = checkForChars(editor, argus.end, outsideAfterRange, insideAfterRange);
    }

    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        // Disable formatting
        if (charsBefore) {
            editBuilder.delete(beforeRange!);
        }
        if (charsAfter) {
            editBuilder.delete(afterRange!);
        }
        // Enable formatting
        if (argus.start && argus.end && !charsBefore && !charsAfter) {
            editBuilder.insert(start, argus.start);
            editBuilder.insert(end, argus.end);
        }
        else if (argus.start && !charsBefore) {
            editBuilder.insert(start, argus.start);
        }
        else if (argus.end && !charsAfter) {
            editBuilder.insert(end, argus.end);
        }
        if (argus.self) {
            if (typeof argus.self === "string") {
                editBuilder.replace(range, argus.self as string);
            }
            else {
                const regex = new RegExp(argus.self.regex,"g");
                const res = editor.document.getText(range).replaceAll(regex, argus.self.with);
                editBuilder.replace(range, res);
            }
            
        }
    });
    
}