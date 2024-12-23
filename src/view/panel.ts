import * as vscode from 'vscode';
import { panelHtmlContent } from './content/html';
import { usefulEditor } from '../utilities/active_editor';

export function registerPanel(context: vscode.ExtensionContext,commandId:string,panelId:string,title:string) {
    let disposable = vscode.commands.registerCommand(commandId, () => {
        ToolbarPanel.render(context.extensionUri, panelId, title);
    });
    context.subscriptions.push(disposable);
}

/* https://github.com/microsoft/vscode-webview-ui-toolkit-samples */
export class ToolbarPanel {
    public static currentPanel: ToolbarPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
        this._setDisposeListener();
        this._setWebviewMessageListener(this._panel.webview);
    }

    public static render(extensionUri: vscode.Uri, id: string, title: string = id) {
        if (ToolbarPanel.currentPanel) {
            ToolbarPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
        } else {
            const panel = vscode.window.createWebviewPanel(
                id,
                title,
                { preserveFocus: true, viewColumn: 3, },
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    localResourceRoots: [extensionUri],
                }
            );

            ToolbarPanel.currentPanel = new ToolbarPanel(panel, extensionUri);
        }
    }

    public static refresh(extensionUri: vscode.Uri) {
        if (ToolbarPanel.currentPanel) {
            ToolbarPanel.currentPanel._panel.webview.html = ToolbarPanel.currentPanel._getWebviewContent(ToolbarPanel.currentPanel._panel.webview, extensionUri);
        }
    }

    public dispose() {
        ToolbarPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    private _setDisposeListener() {
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    private _setWebviewMessageListener(webview: vscode.Webview) {
        webview.onDidReceiveMessage(
            (message: any) => {
                const { command, argument } = message;
                vscode.commands.executeCommand(command, argument);
            },
            undefined,
            this._disposables
        );
    }

    private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri):string {
        const editor: vscode.TextEditor | undefined = usefulEditor;
        const language = editor ? editor.document.languageId : "markdown";
        return panelHtmlContent(webview, extensionUri, language);
    }
}