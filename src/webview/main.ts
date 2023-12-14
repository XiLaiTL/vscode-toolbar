import { provideVSCodeDesignSystem, vsCodeButton,vsCodeDivider,vsCodePanels,vsCodePanelView,vsCodePanelTab, Button } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton(),vsCodeDivider(),vsCodePanels(),vsCodePanelTab(),vsCodePanelView());
window.addEventListener("load", main);
declare var _buttons: { id: string, onclick: () => any }[];

function main() {
    for (const entry of _buttons) {
        const button = document.getElementById(entry.id) as Button;
        button?.addEventListener("click", entry.onclick);
    }
}