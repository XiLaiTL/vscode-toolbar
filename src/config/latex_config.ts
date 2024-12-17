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
            "name": vscode.l10n.t("Header"),
            "icon": "$H",
            "tools": [
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
                    "name": vscode.l10n.t("Sub Sub Sub Section"),
                    "actions":[{
                        "mode": "replace",
                        "argument": {
                            "start": "\\subsubsubsection{",
                            "end":"}"
                        }
                    }],
                    "icon": "$④",
                    "description": vscode.l10n.t("Sub Sub Sub Section"),
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
                    "icon": "bold",
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
                    "icon": "italic",
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
                    "icon": "$U̲",
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
    ]
};