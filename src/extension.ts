import * as vscode from 'vscode';

import { registers } from './config/id';
import { getConfig, onConfigChange } from './config/configuration';
import { readActions, readToolboxs } from './config/read_config';
import { registerActions } from './action/action';
import { ToolbarPanel, registerPanel } from './view/panel';
import { refreshViews, registerViews } from './view/view';
import { registerHovers } from './view/hover';




export function activate(context: vscode.ExtensionContext) {
	readActions();
	readToolboxs();
	registerActions(context);
	registerPanel(context,registers.commands.openPanel,registers.panel.id,registers.panel.title);
	registerViews(context);

	vscode.commands.executeCommand('setContext', 'ext.hoverLanguages', getConfig("hover.languages",["markdown"]));
	registerHovers(context, getConfig("hover.languages"));

	//TODO: 这里都没有加入subscriptions
	onConfigChange("hover.languages", (newValue: []) => {
		vscode.commands.executeCommand('setContext', 'ext.hoverLanguages', newValue);
	});
	vscode.commands.executeCommand('setContext', 'ext.panelLanguages', getConfig("panel.languages",["markdown"]));
	onConfigChange("panel.languages", (newValue: []) => {
		vscode.commands.executeCommand('setContext', 'ext.panelLanguages', newValue);
	});

	onConfigChange("actions", (newValue: []) => {
		readActions(newValue);
	});


	onConfigChange("builtin.markdown.activate", () => {
		readToolboxs();
		refreshViews();
		ToolbarPanel.refresh(context.extensionUri);
	});

	onConfigChange("builtin.latex.activate", () => {
		readToolboxs();
		refreshViews();
		ToolbarPanel.refresh(context.extensionUri);
	});

	onConfigChange("toolboxs", (newValue:[]) => {
		readToolboxs(newValue);
		refreshViews();
		ToolbarPanel.refresh(context.extensionUri);
	});

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		refreshViews();
		ToolbarPanel.refresh(context.extensionUri);
	});
}

export function deactivate() {}
