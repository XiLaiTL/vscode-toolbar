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
                    "name": vscode.l10n.t("Toggle Frame"),
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
                    "icon": `#χ{<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="1.875ex" height="2.176ex" style="vertical-align: -0.338ex;" viewBox="0 -791.3 807.5 936.9" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" aria-labelledby="MathJax-SVG-1-Title"><title id="MathJax-SVG-1-Title">CALIGRAPHIC X.</title><defs aria-hidden="true"><path stroke-width="1" id="E1-MJCAL-58" d="M324 614Q291 576 250 573Q231 573 231 584Q231 589 232 592Q235 601 244 614T271 643T324 671T400 683H403Q462 683 481 610Q485 594 490 545T498 454L501 413Q504 413 551 442T648 509T705 561Q707 565 707 578Q707 610 682 614Q667 614 667 626Q667 641 695 662T755 683Q765 683 775 680T796 662T807 623Q807 596 792 572T713 499T530 376L505 361V356Q508 346 511 278T524 148T557 75Q569 69 580 69Q585 69 593 77Q624 108 660 110Q667 110 670 110T676 106T678 94Q668 59 624 30T510 0Q487 0 471 9T445 32T430 71T422 117T417 173Q416 183 416 188Q413 214 411 244T407 286T405 299Q403 299 344 263T223 182T154 122Q152 118 152 105Q152 69 180 69Q183 69 187 66T191 60L192 58V56Q192 41 163 21T105 0Q94 0 84 3T63 21T52 60Q52 77 56 90T85 131T155 191Q197 223 259 263T362 327T402 352L391 489Q391 492 390 505T387 526T384 547T379 568T372 586T361 602T348 611Q346 612 341 613T333 614H324Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)" aria-hidden="true"><use href="#E1-MJCAL-58" x="0" y="0"></use></g></svg>}`,
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
                    "icon": "#F{$}",
                    "description": vscode.l10n.t("Toggle math span style for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Math Block"),
                    "actions": ["Markdown: Toggle Math Block"],
                    "icon": "#F{$$}",
                    "description": vscode.l10n.t("Toggle math block style for selected block"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Align Block"),
                    "actions": [{
                        "mode": "block",
                        "argument": {
                            "start": "\\begin{align}",
                            "end": "\\end{align}"
                        }
                    }],
                    "icon": "#F{al}",
                    "description": vscode.l10n.t("Toggle Align Block"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Equation Block"),
                    "actions": [{
                        "mode": "block",
                        "argument": {
                            "start": "\\begin{equation}",
                            "end": "\\end{equation}"
                        }
                    }],
                    "icon": "#F{eq}",
                    "description": vscode.l10n.t("Toggle Equation Block"),
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