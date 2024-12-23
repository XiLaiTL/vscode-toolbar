import * as vscode from 'vscode';
import { usefulEditor } from '../../utilities/active_editor';
export type InsertAction = {
    argument: string,
    mode: "insert"
};

export async function insert(argument: string) {
    const arguRegex = /\$\{(\d):(.*?)\}/g;
    const matches = argument.matchAll(arguRegex);
    const map: { [key: string]: string } = {};
    for (const match of matches) {
        // match[0] 是整个匹配的字符串（包括 ${...} 部分）
        // match[1] 是第一个捕获组的内容（数字部分）
        // match[2] 是第二个捕获组的内容（任意字符部分，非贪婪）
        map[match[1]] = match[2];
    }
    //现在map里是{"1":"title","2":"xxxx"}
    const replaced = argument.replaceAll(arguRegex, "$$$1");
    const input_map: { [key: string]: string } = {};
    for (const key of Object.keys(map)) {
        const input = (await vscode.window.showInputBox({ title: map[key], placeHolder: map[key] })) ?? map[key];
        input_map[key] = input;
    }
    let keys = Object.keys(map).sort();
    let connect_paren = "";
    let connect = "";
    for (const key of keys) {
        const paren_not = input_map[key].replaceAll("(", "\\(").replaceAll(")", "\\)");
        connect_paren = "(" + paren_not + ")" + connect_paren;
        connect = input_map[key] + connect;
    }
    const res = connect.replace(new RegExp(connect_paren), replaced);
    const editor = usefulEditor;
    if (editor) {
        editor.insertSnippet(new vscode.SnippetString(res));
    }
}