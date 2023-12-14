import * as vscode from 'vscode';

export type CommandAction = {
    command: string,
    argument?: object | any[] | string | number | boolean,
    mode: "command",
};

export async function runCommand(command: string, argument: object | any[] | string | number | boolean | undefined) {
    await vscode.commands.executeCommand(command, argument);
}