import * as vscode from 'vscode';

export type CommandAction = {
    command: string,
    argument?: object | any[] | string | number | boolean,
    mode: "command",
};

export async function runCommand(command: string, argument: object | any[] | string | number | boolean | undefined) {
    await vscode.commands.executeCommand(command, argument);
}

/*
https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables
{
    "mode": "command",
    "command": "editor.action.insertSnippet",
    "argument": {
        "name": final_name,
        "snippet": "xxx${TM_SELECTED_TEXT}xxx",
        "langId": "latex"
    }
}
 */