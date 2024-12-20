import { actions } from "../action";
import { toggleBlockContainer } from "../markdown/block";
import { toggleBlockList } from "../markdown/quote";
import { addInsertTool, addToggleBlockTool, addToggleTextTool } from "./add_tool";

export const latexActions: { [key: string]: () => Promise<void> } = {
    'Latex: Toggle Order List': async () => {
        await toggleBlockList("    \\item ");
        await toggleBlockContainer("\\begin{enumerate}", "\\end{enumerate}", "");
    },
    'Latex: Toggle Unorder List': async () => {
        await toggleBlockList("    \\item ");
        await toggleBlockContainer("\\begin{itemize}", "\\end{itemize}", "");
    },
    'Latex: Add Insert Button': async () => { await addInsertTool(); },
    'Latex: Add Label Button': async () => { await addToggleTextTool(); },
    'Latex: Add Block Button': async () => {await addToggleBlockTool();}
};
export function readLatexToolAction() {
    for (const name in latexActions) {
        actions[name] = latexActions[name];
    }
}