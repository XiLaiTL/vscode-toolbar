import * as vscode from "vscode";
import { registers } from "../config/id";
import { viewHtmlContent } from "./content/html";
import { usefulEditor } from "../utilities/active_editor";

export const views: {
    [key: string]: {
        provider?:ToolbarViewProvider,
        title:string
    }
} = {};

export function registerViews(context: vscode.ExtensionContext) {
    const viewEntrys = Object.entries(registers.views);
    for (let [key, view] of viewEntrys) { 
        if (!views[key]) { views[key] = { title: view.title }; }
        views[key].provider = new ToolbarViewProvider(key,context.extensionUri,views[key].title);
        const disposable = vscode.window.registerWebviewViewProvider(view.id, views[key].provider!);
        context.subscriptions.push(disposable);
    }
}

export function refreshViews() {
    for (let key in views) {
        views[key].provider?.refresh();
    }
}

class ToolbarViewProvider implements vscode.WebviewViewProvider {
	private _view?: vscode.WebviewView;

    constructor(
        private readonly _viewKey: string,
        private readonly _extensionUri: vscode.Uri,
        private readonly _title: string
	) { }
    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void> {
        this._view = webviewView;
        
        webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
        };
        webviewView.title = this._title;
        const editor: vscode.TextEditor | undefined = usefulEditor;
        const language = editor ? editor.document.languageId : "markdown";
        webviewView.webview.html = viewHtmlContent(webviewView.webview,this._extensionUri,this._viewKey,language);
        webviewView.webview.onDidReceiveMessage((message) => {
            const { command, argument } = message;
            vscode.commands.executeCommand(command, argument);
        });

    }
    refresh() {
        if (this._view) {
            const editor: vscode.TextEditor | undefined = usefulEditor;
            const language = editor ? editor.document.languageId : "markdown";
            this._view.webview.html = viewHtmlContent(this._view.webview,this._extensionUri,this._viewKey,language); 
        }
    }
    
}