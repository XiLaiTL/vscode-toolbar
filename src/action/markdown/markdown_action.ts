import { actions } from "../action";
import { getCurrentPostion } from "../text_utils";
import { toggleBlockContainer } from "./block";
import { toggleDivider } from "./divider";
import { toggleFormatting } from "./formatting";
import { changeHeaderSize } from "./header_size";
import { insertLinkSnippet, insertFooter, deleteLink, insertPath } from "./link";
import { toggleList, toggleCheckList } from "./list";
import { toggleBlockList } from "./quote";

export const markdownActions: { [key: string]: () => Promise<void> } = {
    'Markdown: Toggle Bold': async () => { await toggleFormatting("**"); },
    'Markdown: Toggle Italic': async () => { await toggleFormatting("*"); },
    'Markdown: Toggle Strikethrough': async () => { await toggleFormatting("~~"); },
    'Markdown: Toggle Math Span': async () => { await toggleFormatting("$"); },
    'Markdown: Toggle Math Block': async () => { await toggleBlockContainer("$$", "$$", ""); },
    'Markdown: Toggle Code Span': async () => { await toggleFormatting("`"); },
    'Markdown: Toggle Code Block': async () => { await toggleBlockContainer("```", "```", "${1:language}"); },
    'Markdown: Toggle Container Block': async () => { await toggleBlockContainer(":::", ":::", " ${1:info}"); },
    'Markdown: Toggle Detail Block': async () => { await toggleBlockContainer("<details> ", "</details>", "<summary> ${1:title} </summary>"); },
    'Markdown: Toggle Quote Block': async () => { await toggleBlockList(">"); },
    'Markdown: Insert Link': async () => { await insertLinkSnippet("[${0:$2}](${1:$1})", ["link", "text"]); },
    'Markdown: Insert Image': async () => { await insertLinkSnippet("![${0:$2}](${1:$1})", ["link", "text"]); },
    'Markdown: Insert Link Reference': async () => { await insertFooter("[${0:$2}][${1:$3}]", "[${1:$3}]:$1 \"${0:$2}\"", ["link", "text", `reference_${getCurrentPostion()}`]); },
    'Markdown: Insert Footnotes': async () => { await insertFooter("[^${0:$2}]", "[^${1:$2}]:$1", ["link", "text"]); },
    'Markdown: Insert Path': async () => { await insertPath(); },
    'Markdown: Delete Link': async () => { await deleteLink(); },
    'Markdown: Increase Header Level': async () => { await changeHeaderSize(true); },
    'Markdown: Decrease Header Level': async () => { await changeHeaderSize(false); },
    'Markdown: Insert Divider': async () => { await toggleDivider("\n---\n$0", "\n---\n$0", "\n---\n",); },
    'Markdown: Insert New Line': async () => { await toggleDivider("\n$0", "\n$0", "\n"); },
    'Markdown: Toggle Order List': async () => { await toggleList(true); },
    'Markdown: Toggle Unorder List': async () => { await toggleList(false); },
    'Markdown: Toggle Check List': async () => { await toggleCheckList(); },
};
export function readMarkdownToolAction() {
    for (const name in markdownActions) {
        actions[name] = markdownActions[name];
    }
}