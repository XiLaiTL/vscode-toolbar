import * as vscode from 'vscode';
import { getSelectionRange, insertSnippet, checkForChars } from '../text_utils';
import { usefulEditor } from '../../utilities/active_editor';

/*
https://github.com/MarcusElg/MarkdownToolbar

MIT License

Copyright (c) 2022 Marcus Elg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */

// Toggles formatting for the current selection or current word
export async function toggleFormatting(chars: string):Promise<void> {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if ( !editor ) { return; }
    const range = getSelectionRange(editor);
    if (!range) {
        await insertSnippet(`${chars}\$0${chars}`);
        return;
    }
    const { start, end } = range;
	const charCount: number = chars.length;
		// Check for chars before and after (in and outside word)
    const outsideBeforeRange = new vscode.Range(start.translate(0, -Math.min(start.character, charCount)), start); // Prevent going outside line
    const insideBeforeRange = new vscode.Range(start, start.translate(0, charCount));
    const insideAfterRange = new vscode.Range(end.translate(0, -charCount), end);
    const outsideAfterRange = new vscode.Range(end, end.translate(0, charCount));

    // Check for chars before word
    const [charsBefore, beforeRange]: [boolean, vscode.Range | null] = checkForChars(editor, chars, outsideBeforeRange, insideBeforeRange);

    // Check for chars after word
    const [charsAfter, afterRange]: [boolean, vscode.Range | null] = checkForChars(editor, chars, outsideAfterRange, insideAfterRange);

    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        // Disable formatting
        if (charsBefore) {
            editBuilder.delete(beforeRange!);
        }

        if (charsAfter) {
            editBuilder.delete(afterRange!);
        }

        // Enable formatting
        if (!charsBefore && !charsAfter) {
            editBuilder.insert(start, chars);
            editBuilder.insert(end, chars);
        }
    });
	
}