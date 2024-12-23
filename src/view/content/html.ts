import * as vscode from 'vscode';
import { Tool, getActionName } from '../../model/tool';
import { registers } from '../../config/id';
import { ToolboxLayer } from '../../model/layer';
import { Toolbox, toolboxs } from '../../model/toolbox';
import { checkActivated } from '../../model/activate';
import { views } from '../view';
import { getUri, getNonce } from '../../utilities/url_utils';

export function htmlContent(
    webview: vscode.Webview, extensionUri: vscode.Uri,
    title: string,
    script: string,
    body: string,
):string {
    const webviewUri = getUri(webview, extensionUri, ["dist", "webview.js"]);
    const styleUri = getUri(webview, extensionUri, ['media', 'styles.css']);
    //IMPORTANT use 'media' instead of 'node_modules'
    const codiconsUri = getUri(webview, extensionUri, ['media', '@vscode/codicons', 'dist', 'codicon.css']);
    const nonce = getNonce();
    return /*html*/ `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}';font-src ${webview.cspSource}; style-src ${webview.cspSource};">
                <title>${title}</title>
                <link href="${styleUri}" rel="stylesheet" />
                <link href="${codiconsUri}" rel="stylesheet" />
            </head>
            <body>
                ${body}
                <script nonce="${nonce}" >
                    const vscode = acquireVsCodeApi();
                    ${script}
                </script>
                <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
            </body>
            </html>
        `;
}

interface HtmlInfo{
    html: string,
    script: string,
    pairs : string
}

const ICON_TEXT = /^\$/;
const ICON_SUBSCRIPT = /^#(.+)\{(.+)\}$/;
const ICON_SVG = /^<svg.+<\/svg>$/;

function iconToCodiconStyle(name: string, icon: string | undefined): string {
    const matches = icon?.match(ICON_SUBSCRIPT);
    if (matches) {
        if (ICON_SVG.test(matches[2])) {
            return /*html*/`${matches[2]}`;
        }
        return /*html*/`<span class="codicon subscript" subscript=${matches[2]}>${matches[1]}</span>`
    }
    const text
        = (!icon) ? name
        : (ICON_TEXT.test(icon)) ? icon.replace(ICON_TEXT, "")
        : "";
    const icon_css = (!text) ? `codicon codicon-${icon}` : "codicon codicon-";
    const icon_text_css = text ? "icon-text" : "";
    return (icon)
        ?/*html*/`<span class="${icon_text_css} ${icon_css}">${text}</span>`
        : text;
}

export function toolHtml(tool: Tool,tipStyple: string): HtmlInfo {
    const name = tool.id;
    const description = tool.description ? tool.description : tool.name;
    const html = /*html*/ `
        <vscode-button id="${name}" class="tip ${tipStyple}" appearance=${(tool.icon) ? "icon" : "secondary"} aria-label="${tool.name}" description="${description}">
            ${iconToCodiconStyle(tool.name,tool.icon)}
        </vscode-button>`;

    return {
        html,
        script:
        `function on_${name}_click(){ 
            vscode.postMessage({command:"${registers.commands.toggle}",argument:"${getActionName(tool)}"})
        }`,
        pairs: `{"id":"${name}","onclick":on_${name}_click}`
    };
}

export function toolboxLayerHtml(index: number, toolboxLayer: ToolboxLayer, language: string): HtmlInfo & {footer:string} {
    const afterFilter = toolboxLayer.tools.filter(tool => checkActivated(tool.activate, language));
    const infos: HtmlInfo[] = [];
    for (let i = 0; i < afterFilter.length; i++){
        const tipStyle = `tip${index < 2 ? "-bottom" : "-top"}${(i < 3) ? "" : "-left"}`;
        const info = toolHtml(afterFilter[i], tipStyle);
        infos.push(info);
    }
    const name = toolboxLayer.id;
    const description = toolboxLayer.description ? toolboxLayer.description : toolboxLayer.name;
    const iconHtml = iconToCodiconStyle(toolboxLayer.name, toolboxLayer.icon);
    const html = /*html*/`
        <div id="${name}" class="toolbar-layer">
            <span class="horizon-line"></span>
            <vscode-button id="${name}-off" class="tip tip-right"  appearance=${(toolboxLayer.icon) ? "icon" : "secondary"} aria-label="${toolboxLayer.name}" description="${description}">
                ${iconHtml}
            </vscode-button>
            <span class="codicon horizon-line-dashed"></span>
            ${infos.map(_info => _info.html).join("\n")}
        </div>`;
    const footer = /*html*/`
        <vscode-button id="${name}-on"  class="hidden tip tip-top-left"   appearance=${(toolboxLayer.icon) ? "icon" : "secondary"} aria-label="${toolboxLayer.name}" description="${description}">
            ${iconHtml}
        </vscode-button>`;
    const script = `${infos.map(_info => _info.script).join("\n")} 
        function on_${name}_on_click(){ 
            document.getElementById('${name}').style.display = 'inline-block'; 
            document.getElementById('${name}-on').style.display = 'none'; 
        }
        function on_${name}_off_click(){ 
            document.getElementById('${name}').style.display = 'none'; 
            document.getElementById('${name}-on').style.display = 'inline-block'; 
        }
        `;
    const pairs = `${infos.map(_info => _info.pairs).join(",\n")},
        {"id":"${name}-on","onclick":on_${name}_on_click},
        {"id":"${name}-off","onclick":on_${name}_off_click}
        `;

    return {
        html,
        script,
        pairs,
        footer
    };
    
}

export function toolboxHtml(toolbox:Toolbox, language:string):HtmlInfo {
    const afterFilter = toolbox.layers.filter(layer => checkActivated(layer.activate, language));
    const infos = [];
    for (let i = 0; i < afterFilter.length;i++) {
        const info = toolboxLayerHtml(i, afterFilter[i], language);
        infos.push(info);
    }
    const name = toolbox.name.replaceAll(" ", "_");
    const footer = /*html*/`
    <div id="${name}-footer" class="footer">
        ${infos.map(_info => _info.footer).join("\n")}
    </div>
    `;

    return {
        html: infos.map(_info => _info.html).join("\n") +  footer,
        // /*html*/`
        // <vscode-divider role="presentation"></vscode-divider>
        // `),
        script: infos.map(_info=>_info.script).join("\n"),
        pairs: infos.map(_info=>_info.pairs).join(",\n")
    };
}

export function viewHtml(webview: vscode.Webview, extensionUri: vscode.Uri,viewKey:string,language:string):HtmlInfo {
    const afterFilter = toolboxs[viewKey].filter(toolbox => checkActivated(toolbox.activate, language));
    const infos = afterFilter.map(toolbox => toolboxHtml(toolbox, language));
    let html: string = "";
    if (afterFilter.length === 1) {
        html = infos.map(_info => _info.html).join("\n");
    }
    else {
        for (let i = 1; i <= afterFilter.length; i++) {
            const toolbox = afterFilter[i-1];
            const info = infos[i - 1];
            html +=
                /*html*/`
                <vscode-panel-tab id="tab-${i}">${toolbox.name}</vscode-panel-tab>
                <vscode-panel-view id="view-${i}">
                    <section>
                        ${info.html}
                    </section>
                </vscode-panel-view>
                `;
        }
        if (html !== "") {
            html = /*html*/`<vscode-panels>${html}</vscode-panels>`;
        }
    }
    
    return {
        html,
        script: infos.map(_info=>_info.script).join("\n"),
        pairs: infos.map(_info=>_info.pairs).join(",\n")
    };
}

export function viewHtmlContent(webview: vscode.Webview, extensionUri: vscode.Uri,viewKey:string,language:string):string {
    const info = viewHtml(webview, extensionUri, viewKey, language);
    const script = `
    var _buttons=[
        ${info.pairs}
    ];
    ${info.script}`;
    return htmlContent(webview, extensionUri, views[viewKey].title, script, info.html);
}

export function panelHtmlContent(webview: vscode.Webview, extensionUri: vscode.Uri,language:string):string {
    const afterFilter = Object.keys(toolboxs).map((viewKey) => viewHtml(webview, extensionUri, viewKey, language));
    const info = {
        html: afterFilter.filter(_info=>_info.html!=="").map(_info=>_info.html).join(
        /*html*/`
        <vscode-divider role="separator"></vscode-divider>
        `),
        script: afterFilter.filter(_info=>_info.script!=="").map(_info=>_info.script).join("\n"),
        pairs: afterFilter.filter(_info=>_info.pairs!=="").map(_info=>_info.pairs).join(",\n")
    };
    
    const script = `
    var _buttons=[
        ${info.pairs}
    ];
    ${info.script}`;
    return htmlContent(webview, extensionUri, registers.panel.title, script, info.html);
    
}