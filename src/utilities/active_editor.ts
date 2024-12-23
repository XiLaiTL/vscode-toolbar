import * as vscode from 'vscode';
import { refreshViews } from '../view/view';
import { ToolbarPanel } from '../view/panel';
export let usefulEditor: vscode.TextEditor | undefined;

export function registerEditor(context: vscode.ExtensionContext) {
    usefulEditor = vscode.window.activeTextEditor;
    context.subscriptions.push(vscode.window.onDidChangeVisibleTextEditors((list) => {
        if (list.length === 0) {
            usefulEditor = undefined;
        }   
    }));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            if (editor !== usefulEditor) {
                usefulEditor = editor;
                refreshViews();
                ToolbarPanel.refresh(context.extensionUri);
            }
            else {
                usefulEditor = editor;
            }
        }
    }));
}