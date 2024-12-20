/*
[![Licence](https://img.shields.io/github/license/intellism/vscode-comment-translate.svg)](https://github.com/intellism/vscode-comment-translate)
*//*
The MIT License (MIT)

Copyright (c) 2016-2018

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


import * as vscode from 'vscode';

const PREFIXCONFIG = "toolbar";

export function getConfig<T>(key: string): T | undefined;
export function getConfig<T>(key: string, defaultValue: T):T;
export function getConfig<T>(key: string, defaultValue?: T):T {
    let configuration = vscode.workspace.getConfiguration(PREFIXCONFIG);
    let value:any = configuration.get<T>(key);
    if (typeof value === 'undefined' || value === '') {
        value = defaultValue;
    }
    return value;
}

export function saveConfig<T>(key: string,value:T):Thenable<void> {
    let configuration = vscode.workspace.getConfiguration(PREFIXCONFIG);
    return configuration.update(key, value, vscode.ConfigurationTarget.Global);
}

export function onConfigChange<T>(context:vscode.ExtensionContext,key:string,callback:(newValue:T)=>void) {
    const disposale = vscode.workspace.onDidChangeConfiguration((eventNames) => {
        if(eventNames.affectsConfiguration(`${PREFIXCONFIG}.${key}`)) {
            let newValue:T = getConfig(key) as T;
            callback(newValue);
        }   
    });
    context.subscriptions.push(disposale);
}