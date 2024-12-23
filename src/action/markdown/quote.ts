import * as vscode from 'vscode';
import { checkLineChars } from '../text_utils';
import { usefulEditor } from '../../utilities/active_editor';

export async function toggleBlockList(chars: string): Promise<void>{
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor||!editor.selection) { return; }
    const startLine: number = editor.selection.start.line;
    const endLine: number = editor.selection.end.line;
    let toggleOn = true;
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        for (let i = startLine; i <= endLine; i++) {
            const haveToggledOn = checkLineChars(chars, i); //have 
            toggleOn = toggleOn && haveToggledOn; //if all have, should toggleOff
            if (!haveToggledOn) {
                editBuilder.insert(new vscode.Position(i, 0), chars);
            }
        }
    });
    if (toggleOn) {//should remove all to toggleOff
        await editor.edit((editBuilder: vscode.TextEditorEdit) => {
            for (let i = startLine; i <= endLine; i++) {
                const lineRange: vscode.Range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, chars.length + 2));
                const lineString: string = editor.document.getText(lineRange);
                const charPos: number = lineString.indexOf(chars.charAt(0));
                const deletionRange = new vscode.Range(new vscode.Position(i, charPos), new vscode.Position(i, charPos + chars.length));
                editBuilder.delete(deletionRange);
            }
        });
    }

}