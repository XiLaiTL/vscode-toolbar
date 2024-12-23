import * as vscode from 'vscode';
import { getConfig } from '../../config/configuration';
import { usefulEditor } from '../../utilities/active_editor';

const ListTypes = ["UnorderPlus", "UnorderAsterisk", "UnorderDash", "OrderDot", "OrderParen"];
type ListType = "UnorderPlus"| "UnorderAsterisk"| "UnorderDash"| "OrderDot"| "OrderParen"|"Normal";
//const isOrderType = (targetType:ListType)=>(targetType === "UnorderPlus"||targetType === "UnorderAsterisk"||targetType === "UnorderDash")
const ListTypeInfo: {
    [listType: string]: {
        symbol: string,
        indent: number,
        regex: RegExp
    }
} = {
    "UnorderPlus": { symbol: "+ ", indent: 2, regex: /^\s?(\+\s)/ },
    "UnorderAsterisk": { symbol: "* ", indent: 2, regex: /^\s?(\*\s)/ },
    "UnorderDash": { symbol: "- ", indent: 2, regex: /^\s?(-\s)/ },
    "OrderDot": { symbol: ". ", indent: 3, regex: /^\s?([0-9]+\.\s)/ },
    "OrderParen": { symbol: ") ", indent: 3, regex: /^\s?([0-9]+\)\s)/ },
    "Normal": { symbol: "", indent: 0, regex: /^(\s[^\s]|[^\s])/ }, //except above
};

function getUnorderListType():ListType {
    const configType = getConfig("builtin.markdown.unorderListStyle",String("+"));
    switch (configType) {
        case "+": return "UnorderPlus";
        case "-": return "UnorderDash";
        case "*": return "UnorderAsterisk";
        default: return "UnorderPlus";
    }
}

function getOrderListType():ListType {
    const configType = getConfig("builtin.markdown.orderListStyle",String("1."));
    switch (configType) {
        case "1.": return "OrderDot";
        case "1)": return "OrderParen";
        default: return "OrderDot";
    }
}

const tabRegExp = /^(\s+)/;
function getTabLength(editor: vscode.TextEditor, line: number):number {
    const lineString = editor.document.lineAt(line).text;
    const matcher = tabRegExp.exec(lineString);
    if (!matcher) {return 0;}
    return matcher[1].length;
}

function checkNewLine(editor: vscode.TextEditor, line: number): boolean{
    const lineString = editor.document.lineAt(line).text;
    return (lineString === "" || lineString === "\n");
}

function findListRange(editor: vscode.TextEditor, startLine: number): ListRange {
    const selfLength = getTabLength(editor, startLine);
    const allLine = editor.document.lineCount-1;
    //const tabLength: { [line: number]: number } = {};
    let minList:number[] = [];
    let aboveLine = startLine;
    for (aboveLine = startLine; aboveLine >= 1; aboveLine--){
        const aboveLength = getTabLength(editor, aboveLine);
        if (aboveLength < selfLength||checkNewLine(editor,aboveLine)) { break; }
        else if (aboveLength === selfLength) { minList.push(aboveLine); }
        //tabLength[aboveLine] = aboveLength;
    }
    aboveLine++;
    let belowLine = startLine; //TODO： here can reduce calculation
    for (belowLine = startLine; belowLine <= allLine; belowLine++){
        const belowLength = getTabLength(editor, belowLine);
        if (belowLength < selfLength||checkNewLine(editor,belowLine)) { break; }
        else if (belowLength === selfLength) { minList.push(belowLine); }
        //tabLength[belowLine] = belowLength; 
    }
    belowLine--;
    minList.sort();
    if (aboveLine >= belowLine) { // when meet blank line
        aboveLine = startLine;
        belowLine = startLine;
        minList = [startLine];
    }
    return [aboveLine, belowLine, { indent: selfLength, minList }];
}

function findOutsideLine(editor: vscode.TextEditor, startLine: number, endLine: number):{indent:number,minList: number[]} {
    let minList: number[] = [];
    let indent = Number.MAX_VALUE;
    for (let line = startLine; line <= endLine; line++){
        const tabLength = getTabLength(editor, line);
        if (indent > tabLength) {
            minList = [line];
            indent = tabLength;
        }
        else if(indent === tabLength) {
            minList.push(line);
        }
    }
    return { indent, minList };
}

export async function toggleList(order:boolean) {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor||!editor.selection) { return; }
    let targetType:ListType = getUnorderListType();
    if (order) {
        targetType = getOrderListType();
    }
    else {
        
    }    
    let startLine: number, endLine: number;
    let minList: number[] = [];
    let indent = Number.MAX_VALUE;
    if (editor.selection.start.isEqual(editor.selection.end)) {
        [startLine, endLine, { indent, minList }] = findListRange(editor, editor.selection.end.line);
    }
    else {
        [startLine, endLine] = [editor.selection.start.line, editor.selection.end.line];
        ({ indent, minList } = findOutsideLine(editor,startLine, endLine));
    }
    
    let toggleOn = true;
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        let i = 1;
        for (let line = startLine; line <= endLine; line++) {
            if (minList.includes(line)) {
                const lineType = checkListType(editor, line, indent);
                const haveToggledOn = lineType === targetType;
                toggleOn = toggleOn && haveToggledOn;
                if (!haveToggledOn) {
                    const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0 + indent), new vscode.Position(line, 8 + indent));
                    const lineString = editor.document.getText(lineRange);
                    lineToList(editBuilder, lineString, line, indent, lineType, getStyleForLineToList(targetType, i));
                }
                i++;
            }
            else {
                const parentType = findParentListType(editor, line);
                // if parent is 2, target is 3, should insert " " 
                const offset = ListTypeInfo[targetType].indent - ListTypeInfo[parentType].indent;
                if (offset >= 0) {
                    for (let j = 1; j <= offset ; j++){
                        editBuilder.insert(new vscode.Position(line, 0)," ");
                    }
                }
                else {
                    for (let j = 1; j <= -offset ; j++){
                        editBuilder.delete(new vscode.Range(new vscode.Position(line, 0),new vscode.Position(line, 1)));
                    }
                }
            }
        }
        if (toggleOn) {//should toggle off
            for (let line = startLine; line <= endLine; line++) {
                if (minList.includes(line)) {//
                    const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0 + indent), new vscode.Position(line, 8 + indent));
                    const lineString = editor.document.getText(lineRange);
                    lineToList(editBuilder, lineString, line, indent, targetType,"");
                }
                else {//delete the tab
                    editBuilder.delete(new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, ListTypeInfo[targetType].indent)));
                }
            }
        }
    });
    
    
}
type ListRange = [startLine: number, endLine: number, { indent: number, minList: number[] }];


function getStyleForLineToList(targetType:ListType, order: number =1 ) {
    let replaceStyle:string = "";
    switch (targetType) {
        case 'UnorderPlus':
        case 'UnorderAsterisk':
        case 'UnorderDash':
            replaceStyle = ListTypeInfo[targetType].symbol;
            break;
        case 'OrderDot':
        case 'OrderParen':
            replaceStyle = `${order}${ListTypeInfo[targetType].symbol}`;
            break;
        case 'Normal':break;
    }
    return replaceStyle;
}

//when replaceStyle === "" => lineToNormal
function lineToList(editBuilder: vscode.TextEditorEdit,lineString:string, line: number, indent:number, listType: ListType, replaceStyle:string  ) {
    if(listType==="Normal") {
        editBuilder.insert(new vscode.Position(line,0+indent),replaceStyle);
        return;
    }
    const matcher = ListTypeInfo[listType].regex.exec(lineString);
    const substring = matcher![1];
    const charPos = lineString.indexOf(substring);
    const replaceRange = new vscode.Range(new vscode.Position(line, 0 + indent + charPos), new vscode.Position(line, 0 + indent + charPos + substring.length));
    editBuilder.replace(replaceRange, replaceStyle);
}


export async function toggleCheckList() {
    const editor: vscode.TextEditor | undefined = usefulEditor;
    if (!editor||!editor.selection) { return; }
    // if (editor.selection.start.isEqual(editor.selection.end)) {}
    const startLine: number = editor.selection.start.line;
    const endLine: number = editor.selection.end.line;
    let { indent, minList } = findOutsideLine(editor,startLine, endLine);
    let toggleOn = true;
    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        for (let line = startLine; line <= endLine; line++){
            if (minList.includes(line)) {
                const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0 + indent), new vscode.Position(line, 12 + indent));
                const lineString = editor.document.getText(lineRange);
                const lineType = checkListType(editor, line, indent);
                const haveToggledOn = checkCheckList(editor, line, indent);
                toggleOn = toggleOn && haveToggledOn;
                if (!haveToggledOn) {
                    lineToCheckList(editBuilder, lineString, line, indent,lineType, false);
                }
            }
            
        }
        if (toggleOn) {
            for (let line = startLine; line <= endLine; line++){
                if (minList.includes(line)) {
                    const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0 + indent), new vscode.Position(line, 12 + indent));
                    const lineString = editor.document.getText(lineRange);
                    const lineType = checkListType(editor, line, indent);
                    lineToCheckList(editBuilder, lineString, line, indent,lineType, true);
                }
            }
        }
    });
}

function lineToCheckList(editBuilder: vscode.TextEditorEdit,lineString:string, line: number, indent:number, listType: ListType, shouldToggleOff: boolean) {
    if(listType==="Normal") {
        if (!shouldToggleOff) { editBuilder.insert(new vscode.Position(line, 0 + indent), `${getConfig("builtin.markdown.unorderListStyle",String("+"))} [ ] `); }
        return;
    }
    const matcher = ListTypeInfo[listType].regex.exec(lineString);
    const substring = matcher![1];
    const charPos = lineString.indexOf(substring);
    if (!shouldToggleOff) {
        editBuilder.insert(new vscode.Position(line, 0 + indent + charPos+substring.length), "[ ] ");
    }
    else {
        const deleteRange = new vscode.Range(new vscode.Position(line, 0 + indent + charPos+substring.length), new vscode.Position(line, 0 + indent + charPos + substring.length+4));
        editBuilder.delete(deleteRange);
    }
}

const checkListRegExp = /^\s?(([0-9]+(\)|\.))|\*|\+|\-)\s\[(\s|x|X)\]\s/;
function checkCheckList(editor: vscode.TextEditor, line: number, indent: number) {
    const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0+indent), new vscode.Position(line, 8+indent));
    const lineString: string = editor.document.getText(lineRange);
    return checkListRegExp.test(lineString);
}


function checkListType(editor: vscode.TextEditor, line: number, indent: number):ListType{
    const lineRange: vscode.Range = new vscode.Range(new vscode.Position(line, 0+indent), new vscode.Position(line, 8+indent));
    const lineString: string = editor.document.getText(lineRange);
    for (let listType of ListTypes) {
        if (ListTypeInfo[listType!].regex.test(lineString)) {
            return listType! as ListType ;
        }
    }
    return "Normal";
}

function findParentListType(editor: vscode.TextEditor, startLine: number){
    const selfLength = getTabLength(editor, startLine);
    let aboveLine = startLine; let aboveLength = selfLength;
    for (aboveLine = startLine; aboveLine >= 1; aboveLine--){
        aboveLength = getTabLength(editor, aboveLine);
        if (aboveLength < selfLength) { break; }
    }
    if (aboveLine === 0) {
        return checkListType(editor, startLine, selfLength);
    }
    else {
        return checkListType(editor, aboveLine, aboveLength);
    }
}