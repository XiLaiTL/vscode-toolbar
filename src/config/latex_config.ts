import { Toolbox } from "../model/toolbox";
import * as vscode from 'vscode';

export const latexToolbox: Toolbox =
{
    "name": vscode.l10n.t("Latex Toolbox"),
    "view": "latex",
    "activate": {
        "languages": ["latex"],
        "hover": true,
    },
    "layers": [

        {
            "name": "Custom",
            "icon": "account",
            "tools": [
                {
                    "name": "Add Insert Button",
                    "icon": "person-add",
                    "actions": ["Latex: Add Insert Button"],
                    "description": "Add Custom Button for long text",
                    "activate": true
                },
                {
                    "name": "Add Text Button",
                    "icon": "person-add",
                    "actions": ["Latex: Add Label Button"],
                    "description": "Add Custom Button for '\\textbf{}'",
                    "activate": true
                },
                {
                    "name": "Add Block Button",
                    "icon": "person-add",
                    "actions": ["Latex: Add Block Button"],
                    "description": "Add Custom Button for '\\begin{}\\end{}'",
                    "activate": true
                }
            ],
            "activate": {
                "hover": false,
                "languages":["latex"]
            }

        },
        {
            "name": vscode.l10n.t("Blocks"),
            "icon": "symbol-unit",
            "activate": true,
            "tools": [
                {
                    "name": vscode.l10n.t("Part"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\part{",
                            "end":"}"
                        }
                    }],
                    "icon": "layout-panel",
                    "description": vscode.l10n.t("Part"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Chapter"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\chapter{",
                            "end":"}"
                        }
                    }],
                    "icon": "$§",
                    "description": vscode.l10n.t("Chapter"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Order List"),
                    "actions": ["Latex: Toggle Order List"],
                    "icon": "list-ordered",
                    "description": vscode.l10n.t("Toggle Order List"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Unorder List"),
                    "actions": ["Latex: Toggle Unorder List"],
                    "icon": "list-unordered",
                    "description": vscode.l10n.t("Toggle Unorder List"),
                    "activate": true
                },
                {
                    "name": "Toggle Frame",
                    "actions": [{
                        "mode": "block",
                        "argument": {
                            "start": "\\begin{frame}",
                            "label": "\\frametitle{}",
                            "end": "\\end{frame}"
                        }
                    }],
                    "icon": "note",
                    "description": vscode.l10n.t("Toggle Frame"),
                    "activate": true
                }
            ]
        },
        {
            "name": vscode.l10n.t("Header"),
            "icon": "$H",
            "tools": [
                
                {
                    "name": vscode.l10n.t("Section"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\section{",
                            "end":"}"
                        }
                    }],
                    "icon": "$①",
                    "description": vscode.l10n.t("Section"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Sub Section"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\subsection{",
                            "end":"}"
                        }
                    }],
                    "icon": "$②",
                    "description": vscode.l10n.t("Sub Section"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Sub Sub Section"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\subsubsection{",
                            "end":"}"
                        }
                    }],
                    "icon": "$③",
                    "description": vscode.l10n.t("Sub Sub Section"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Paragraph"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\paragraph{",
                            "end":"}"
                        }
                    }],
                    "icon": "browser",
                    "description": vscode.l10n.t("Paragraph"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Sub Paragraph"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\subparagraph{",
                            "end":"}"
                        }
                    }],
                    "icon": "layout-menubar",
                    "description": vscode.l10n.t("Sub Paragraph"),
                    "activate": true
                },
                

                // {
                //     "name": vscode.l10n.t("Increase Header Level"),
                //     "actions": ["Markdown: Increase Header Level"],
                //     "icon": "fold-up",
                //     "description": vscode.l10n.t("Increase header level (h2->h1)"),
                //     "activate": true
                // },
                // {
                //     "name": vscode.l10n.t("Decrease Header Level"),
                //     "actions": ["Markdown: Decrease Header Level"],
                //     "icon": "fold-down",
                //     "description": vscode.l10n.t("Decrease header level (h1->h2)"),
                //     "activate": true
                // },
            ]
        },
        {
            "name": vscode.l10n.t("Formatting"),
            "icon": "pencil",
            "tools": [
                {
                    "name": vscode.l10n.t("Toggle Bold"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\textbf{",
                            "end":"}"
                        }
                    }],
                    "icon": "$🄱",
                    "description": vscode.l10n.t("Toggle bold for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Italic"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\textit{",
                            "end":"}"
                        }
                    }],
                    "icon": "$🄸",
                    "description": vscode.l10n.t("Toggle italic for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Underline"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\underline{",
                            "end":"}"
                        }
                    }],
                    "icon": "$🅄",
                    "description": vscode.l10n.t("Toggle undeline for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Math Span"),
                    "actions": ["Markdown: Toggle Math Span"],
                    "icon": "$ξ",
                    "description": vscode.l10n.t("Toggle math span style for selected text"),
                    "activate": true
                }
            ],
        },
        {
            "name": "Font Formatting",
            "icon": "$F",
            "activate":true,
            "tools": [
                {
                    "name": vscode.l10n.t("Toggle Bold"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\mathbf{",
                            "end":"}"
                        }
                    }],
                    "icon": "bold",
                    "description": vscode.l10n.t("Toggle bold for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Italic"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\mathit{",
                            "end":"}"
                        }
                    }],
                    "icon": "italic",
                    "description": vscode.l10n.t("Toggle italic for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Blackboard Bold"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\mathbb{",
                            "end":"}"
                        }
                    }],
                    "icon": "$ℕ",
                    "description": vscode.l10n.t("Toggle Blackboard Bold for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Fraktur"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\mathfrak{",
                            "end":"}"
                        }
                    }],
                    "icon": "$ℜ",
                    "description": vscode.l10n.t("Toggle Fraktur for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Calligraphy"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\mathcal{",
                            "end":"}"
                        }
                    }],
                    "icon": "$χ",
                    "description": vscode.l10n.t("Toggle Calligraphy for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Sans-serif"),
                    "actions": [{
                        "mode": "replace",
                        "argument": {
                            "start": "\\mathsf{",
                            "end":"}"
                        }
                    }],
                    "icon": "$S",
                    "description": vscode.l10n.t("Toggle Sans-serif for selected text"),
                    "activate": true
                },
            ]
        },
        {
            "name": "Formula",
            "icon": "$α",
            "tools": [
                {
                    "name": "Open Math Preview",
                    "actions": [{
                        "mode": "command",
                        "command": "latex-workshop.toggleMathPreviewPanel",
                    }],
                    "icon": "preview",
                    "description": "Open Math Preview",
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Math Span"),
                    "actions": ["Markdown: Toggle Math Span"],
                    "icon": "$ξ",
                    "description": vscode.l10n.t("Toggle math span style for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Math Block"),
                    "actions": ["Markdown: Toggle Math Block"],
                    "icon": "symbol-operator",
                    "description": vscode.l10n.t("Toggle math block style for selected block"),
                    "activate": true
                },
                {
                    "name": "Clipboard Image to latex",
                    "actions": [{
                        "mode": "command",
                        "command": "latex-pix.paste-latex-from-clipboard"
                    }],
                    "icon": "output",
                    "description": "Paste the image to latex",
                    "activate": true
                },
                {
                    "name": "Image to latex",
                    "actions": [{
                        "mode": "command",
                        "command": "latex-pix.paste-latex-from-open-path"
                    }],
                    "icon": "file-symlink-file",
                    "description": "Open a photo to convert it",
                    "activate": true
                },
            ]
        },
        {
            "name": vscode.l10n.t("Text Blank"),
            "icon": "$__",
            "activate": {
                "hover": false,
                "languages":["latex"]
            },
            "tools": [
                {
                    "name": vscode.l10n.t("Indent"),
                    "actions": [{
                        "mode": "replace",
                        "argument":"\\indent"
                    }],
                    "icon": "indent",
                    "description":vscode.l10n.t("Add Indent"),
                    "activate": true,
                },
                {
                    "name": vscode.l10n.t("Two Space"),
                    "actions": [{
                        "mode": "replace",
                        "argument":"\\qquad"
                    }],
                    "icon": "$__",
                    "description":vscode.l10n.t("Add Two Space"),
                    "activate": true,
                },
                {
                    "name": vscode.l10n.t("One and Half Space"),
                    "actions": [{
                        "mode": "replace",
                        "argument":"\\hspace{1.3em}"
                    }],
                    "icon": "$_",
                    "description":vscode.l10n.t("One and Half Space"),
                    "activate": true,
                },
                {
                    "name": vscode.l10n.t("Circle"),
                    "actions": [{
                        "mode": "replace",
                        "argument":"\\textcircled"
                    }],
                    "icon": "$◯",
                    "description":vscode.l10n.t("Circle"),
                    "activate": true,
                },
            ]
        }
    ]
};