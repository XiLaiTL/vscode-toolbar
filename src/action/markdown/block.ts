import * as vscode from 'vscode';
import { checkLineChars, insertSnippet } from '../text_utils';
import { usefulEditor } from '../../utilities/active_editor';

export async function toggleBlockContainer(startChars: string,endChars:string,tip:string): Promise<void>{
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor) { return; }
    if (!editor.selection||editor.selection.start.isEqual(editor.selection.end)) {
        await insertSnippet(`\n${startChars}${tip}\n${endChars}\n`);
        return;
    }
    const startLine: number = editor.selection.start.line;
    const endLine: number = editor.selection.end.line;
    const allLine: number = editor.document.lineCount - 1;
    const aboveStart = checkLineChars(startChars,startLine === 0 ? startLine : startLine - 1);
    const onStart = checkLineChars(startChars,startLine);
    const onEnd = checkLineChars(endChars,endLine);
    const belowEnd = checkLineChars(endChars, endLine === allLine ? endLine: endLine + 1);
    const toggleOn = (aboveStart || onStart) && (onEnd || belowEnd); //all have
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        if (toggleOn) {//should toggle off
            const endRange = editor.document.lineAt(startLine===endLine? endLine + 1 : onEnd ? endLine : endLine + 1).range;
            editBuilder.delete(endRange);

            const startRange = editor.document.lineAt(onStart ? startLine : startLine - 1).range;
            editBuilder.delete(startRange);

        }
        else {
            if (!(onEnd || belowEnd)) {
                editBuilder.insert(editor.document.lineAt(endLine).range.end, `\n${endChars}\n`);
            }
            // if (!(aboveStart || onStart)) {
            //     editBuilder.insert(new vscode.Position(startLine, 0), `\n${startChars} ${tip}\n`);
            // }
        }
    });
    if (!toggleOn && !(aboveStart || onStart)) {
        await editor.insertSnippet(new vscode.SnippetString(`\n${startChars}${tip}\n`), new vscode.Position(startLine, 0));
    }
    
}

