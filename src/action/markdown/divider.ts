import * as vscode from 'vscode';
import { insertSnippet } from '../text_utils';
import { usefulEditor } from '../../utilities/active_editor';

export async function toggleDivider(middle: string, start: string, end: string) {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor||!editor.selection) { return; }
    if (editor.selection.start.isEqual(editor.selection.end)) {
        const addEnter = (editor.selection.start.character === 0) ? "" : "\n";
        await insertSnippet(`${addEnter}${middle}`);
        return;
    }
    const lineRange = editor.document.lineAt(editor.selection.end.line).range;
    const addStartEnter = (editor.selection.start.isEqual(lineRange.start)) ? "" : "\n";
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        editBuilder.insert(editor.selection.end, `\n${end}`);
    });
    await editor.insertSnippet(new vscode.SnippetString(`${addStartEnter}${start}`), editor.selection.start);
}