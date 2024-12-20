import { ReplaceAction, replace } from "../action/custom/replace";
import * as vscode from 'vscode';
import { CommandAction, runCommand } from "./custom/command";
import { RunAction } from "./custom/run";
import { markdownActions } from "./markdown/markdown_action";
import { registers } from "../config/id";
import { insert, InsertAction } from "./custom/insert";
import { block, BlockAction } from "./custom/block";

export const actions: { [key: string]: () => Promise<void> } = {};

export type Action = {
    name?: string,
} & ( ReplaceAction | CommandAction | RunAction | InsertAction | BlockAction );

export function registerActions(context: vscode.ExtensionContext) {
    const toggleCommandHandler = async (name: string) => {
		if (actions[name]) {
            await actions[name](); 
            return;
        }
        await runCommand(name, undefined);
	};
	const disposable = vscode.commands.registerCommand(registers.commands.toggle,toggleCommandHandler );
	context.subscriptions.push(disposable);
}

export function deserializeAction(action: Action|string): () => Promise<void>  {
    if (typeof action === "string") {
        if (markdownActions[action]) {
            return markdownActions[action];
        }
        return async () => {
            if (actions[action]) {
                await actions[action]();
                return;
            }
            // const commands = await vscode.commands.getCommands();
            // if (commands.includes(action)) 
            await runCommand(action, undefined);
        };
    }
    
    return async () => {
        switch (action.mode) {
            case "command": {
                if (action.command) {
                    await runCommand(action.command, action.argument);
                }
            } break;
            case "replace": {
                const actionRe = action as ReplaceAction;
                await replace(actionRe.argument);
            } break;
            case "insert": {
                const actionInsert = action as InsertAction;
                await insert(actionInsert.argument);
            } break;
            case "block": {
                const actionBlock = action as BlockAction;
                await block(actionBlock.argument);
            } break;
            case "run": {
                const actionRe = action as RunAction;
            } break;
        }
    };
}