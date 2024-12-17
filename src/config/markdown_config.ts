import { Toolbox } from "../model/toolbox";
import * as vscode from 'vscode';

export const markdownToolbox: Toolbox =
{
    "name": vscode.l10n.t("Markdown Toolbox"),
    "view": "markdown",
    "activate": {
        "languages": ["markdown"],
        "hover": true,
    },
    "layers": [
        {
            "name": vscode.l10n.t("Formatting"),
            "icon": "markdown",
            "tools": [
                {
                    "name": vscode.l10n.t("Toggle Bold"),
                    "actions": ["Markdown: Toggle Bold"],
                    "icon": "bold",
                    "description": vscode.l10n.t("Toggle bold for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Italic"),
                    "actions": ["Markdown: Toggle Italic"],
                    "icon": "italic",
                    "description": vscode.l10n.t("Toggle italic for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Strikethrough"),
                    "actions": ["Markdown: Toggle Strikethrough"],
                    "icon": "$̶S̶",
                    "description": vscode.l10n.t("Toggle strikethrough for selected text"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Code Span"),
                    "actions": ["Markdown: Toggle Code Span"],
                    "icon": "bracket",
                    "description": vscode.l10n.t("Toggle code span style for selected text"),
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
                    "name": vscode.l10n.t("Increase Header Level"),
                    "actions": ["Markdown: Increase Header Level"],
                    "icon": "fold-up",
                    "description": vscode.l10n.t("Increase header level (h2->h1)"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Decrease Header Level"),
                    "actions": ["Markdown: Decrease Header Level"],
                    "icon": "fold-down",
                    "description": vscode.l10n.t("Decrease header level (h1->h2)"),
                    "activate": true
                },
            ],
        },

        {
            "name": vscode.l10n.t("Blocks"),
            "icon": "symbol-unit",
            "activate": true,
            "tools": [
                {
                    "name": vscode.l10n.t("Toggle Container Block"),
                    "actions": ["Markdown: Toggle Container Block"],
                    "icon": "inbox",
                    "description": vscode.l10n.t("Toggle container block style for selected block"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Detail Block"),
                    "actions": ["Markdown: Toggle Detail Block"],
                    "icon": "fold",
                    "description": vscode.l10n.t("Toggle detail block style for selected block"),
                    "activate": true
                },
                {
                "name": vscode.l10n.t("Toggle Quote Block"),
                    "actions": ["Markdown: Toggle Quote Block"],
                    "icon": "quote",
                    "description": vscode.l10n.t("Toggle quote style for selected block"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Code Block"),
                    "actions": ["Markdown: Toggle Code Block"],
                    "icon": "code",
                    "description": vscode.l10n.t("Toggle code block style for selected block"),
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
                    "name": vscode.l10n.t("Insert Divider"),
                    "actions": ["Markdown: Insert Divider"],
                    "icon": "insert",
                    "description": vscode.l10n.t("Insert divider"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Insert New Line"),
                    "actions": ["Markdown: Insert New Line"],
                    "icon": "newline",
                    "description": vscode.l10n.t("Insert New Line"),
                    "activate": true
                },
            ]

        },
        {
            "name": vscode.l10n.t("Links"),
            "icon": "file-symlink-file",
            "activate": true,
            "tools": [
                {
                    "name": vscode.l10n.t("Insert Link"),
                    "actions": ["Markdown: Insert Link"],
                    "icon": "link",
                    "description": vscode.l10n.t("Insert link at the position of the cursor"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Insert Image"),
                    "actions": ["Markdown: Insert Image"],
                    "icon": "file-media",
                    "description": vscode.l10n.t("Insert image at the position of the cursor"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Insert Link Reference"),
                    "actions": ["Markdown: Insert Link Reference"],
                    "icon": "references",
                    "description": vscode.l10n.t("Insert link reference at the position of the cursor and add target at the end of article"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Insert Footnotes"),
                    "actions": ["Markdown: Insert Footnotes"],
                    "icon": "link-external",
                    "description": vscode.l10n.t("Insert footnotes at the position of the cursor and add target at the end of article"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Insert Path"),
                    "actions": ["Markdown: Insert Path"],
                    "icon": "go-to-file",
                    "description": vscode.l10n.t("Open a dialog and choose a path to insert it at the position of the cursor"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Delete Link"),
                    "actions": ["Markdown: Delete Link"],
                    "icon": "magnet",
                    "description": vscode.l10n.t("Delete the link"),
                    "activate": true
                },
            ]
        },
        {
            "name": vscode.l10n.t("Lists"),
            "icon": "list-selection",
            "activate": true,
            "tools": [
                {
                    "name": vscode.l10n.t("Toggle Order List"),
                    "actions": ["Markdown: Toggle Order List"],
                    "icon": "list-ordered",
                    "description": vscode.l10n.t("Toggle Order List"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Unorder List"),
                    "actions": ["Markdown: Toggle Unorder List"],
                    "icon": "list-unordered",
                    "description": vscode.l10n.t("Toggle Unorder List"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Toggle Check List"),
                    "actions": ["Markdown: Toggle Check List"],
                    "icon": "checklist",
                    "description": vscode.l10n.t("Toggle Check List"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Create Content List"),
                    "actions": ["markdown.extension.toc.create"],
                    "icon": "symbol-class",
                    "description": vscode.l10n.t("Create Content List (Markdown All in One)"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Indent"),
                    "actions": ["markdown.extension.onIndentLines"],
                    "icon": "indent",
                    "description": vscode.l10n.t("Indent Tab (Markdown All in One)"),
                    "activate": true
                },
                {
                    "name": vscode.l10n.t("Outdent"),
                    "actions": ["markdown.extension.onOutdentLines"],
                    "icon": "arrow-small-left",
                    "description": vscode.l10n.t("Outdent Tab  (Markdown All in One)"),
                    "activate": true
                }
            ]
        },
    ],
};