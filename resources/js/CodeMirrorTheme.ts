/*
MIT License

Copyright (C) 2018-2021 by Marijn Haverbeke <marijn@haverbeke.berlin> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */

// Import necessary modules and components from CodeMirror and Lezer.
import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

// Define color constants for the theme.
const chalky = "#e5c07b",
    coral = "#e06c75",
    cyan = "#56b6c2",
    invalid = "#ffffff",
    ivory = "#abb2bf",
    stone = "#7d8799",
    malibu = "#61afef",
    sage = "#98c379",
    whiskey = "#d19a66",
    violet = "#c678dd",
    darkBackground = "#21252b",
    highlightBackground = "#2c313a",
    background = "#111827",
    tooltipBackground = "#353a42",
    selection = "#3E4451",
    cursor = "#528bff";

// Create an object to hold all color constants for easy reference.
const color = {
    chalky,
    coral,
    cyan,
    invalid,
    ivory,
    stone,
    malibu,
    sage,
    whiskey,
    violet,
    darkBackground,
    highlightBackground,
    background,
    tooltipBackground,
    selection,
    cursor
};

// Define the main theme for the editor using EditorView.theme.
const oneDarkTheme = EditorView.theme({
    "&": {
        color: ivory,
        backgroundColor: background
    },

    // Set caret color in the editor.
    ".cm-content": {
        caretColor: cursor
    },

    // Style for the cursor and drop cursor.
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },

    // Style for selected text in the editor.
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection },

    // Style for the panels within the editor.
    ".cm-panels": { backgroundColor: darkBackground, color: ivory },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

    // Style for search matches.
    ".cm-searchMatch": {
        backgroundColor: "#72a1ff59",
        outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
        backgroundColor: "#6199ff2f"
    },

    // Style for the active line in the editor.
    ".cm-activeLine": { backgroundColor: "#6699ff0b" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

    // Style for matching brackets when focused.
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
        backgroundColor: "#bad0f847"
    },

    // Style for the gutters (line numbers, etc.).
    ".cm-gutters": {
        backgroundColor: background,
        color: stone,
        border: "none"
    },

    // Style for the active line gutter.
    ".cm-activeLineGutter": {
        backgroundColor: highlightBackground
    },

    // Style for fold placeholders.
    ".cm-foldPlaceholder": {
        backgroundColor: "transparent",
        border: "none",
        color: "#ddd"
    },

    // Style for tooltips.
    ".cm-tooltip": {
        border: "none",
        backgroundColor: tooltipBackground
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
        borderTopColor: tooltipBackground,
        borderBottomColor: tooltipBackground
    },
    ".cm-tooltip-autocomplete": {
        "& > ul > li[aria-selected]": {
            backgroundColor: highlightBackground,
            color: ivory
        }
    }
}, { dark: true });

// Define the syntax highlighting style using HighlightStyle.define.
const oneDarkHighlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: violet },
    { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: coral },
    { tag: [t.function(t.variableName), t.labelName], color: malibu },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
    { tag: [t.definition(t.name), t.separator], color: ivory },
    { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: chalky },
    { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: cyan },
    { tag: [t.meta, t.comment], color: stone },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.link, color: stone, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: coral },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
    { tag: [t.processingInstruction, t.string, t.inserted], color: sage },
    { tag: t.invalid, color: invalid },
]);

// Combine the theme and highlighting style into a single extension.
export const oneDarkModified: Extension = [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle)];
