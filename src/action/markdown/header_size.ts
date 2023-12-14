import * as vscode from 'vscode';

export async function changeHeaderSize(increase: Boolean): Promise<void> {
	const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
    if (!editor || !editor.selection) { return; }
    // Get current line from current selection or current word
    const line: number = editor.selection.start.line;
    const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, 8));
    const lineString: string = editor.document.getText(lineRange);

    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        if (increase) { //remove '#'
            if (lineString.trim().startsWith("# ")) {
                
            }
            else if (lineString.trim().startsWith("#")) {
                const charPos: number = lineString.indexOf("#");
                // Only remove chars that affect header
                if (charPos <= 3) {
                    // Remove char
                    const deletionRange = new vscode.Range(new vscode.Position(line, charPos), new vscode.Position(line, charPos + 1));
                    editBuilder.delete(deletionRange);
                }
            }
            else {
                editBuilder.insert(lineRange.start, "# ");
            }
        }
        else {
            // h6 is the smallest header
            if (!lineString.trim().startsWith("######")) {
                // Add char
                if (lineString.trim().startsWith("#")) {
                    editBuilder.insert(lineRange.start, "#");
                }
                
            }
            else {
                const charPos: number = lineString.indexOf("#");
                const deleteNumber: number = lineString.trim().startsWith("###### ") ? 7 : 6;
                const deletionRange = new vscode.Range(new vscode.Position(line, charPos), new vscode.Position(line, charPos + deleteNumber));
                editBuilder.delete(deletionRange);
            }
        }
    });
}