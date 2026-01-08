import { clsx } from 'clsx';
import { Editor, Element, Text, Transforms } from 'slate';
import { twMerge } from 'tailwind-merge';

import { deserialize } from './deserialize';

import type { ClassValue } from 'clsx';
import type { Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CustomEditorHelper = {
  isBoldMarkActive(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold : false;
  },
  isUnderscoreMarkActive(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.underscore : false;
  },
  isCodeBlockActive(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.code : false;
  },
  toggleCodeBlock(editor: ReactEditor) {
    const isActive = CustomEditorHelper.isCodeBlockActive(editor);

    if (isActive) {
      editor.removeMark('code');
      return;
    }

    editor.addMark('code', true);
  },
  toggleBoldMark(editor: ReactEditor) {
    const isActive = CustomEditorHelper.isBoldMarkActive(editor);

    if (isActive) {
      editor.removeMark('bold');
      return;
    }

    editor.addMark('bold', true);
  },
  toggleUnderscoreMark(editor: ReactEditor) {
    const isActive = CustomEditorHelper.isUnderscoreMarkActive(editor);

    if (isActive) {
      editor.removeMark('underscore');
      return;
    }

    editor.addMark('underscore', true);
  },
  insertImage(editor: ReactEditor, url: string, width?: number) {
    Transforms.insertNodes(editor, {
      type: 'image',
      url,
      width,
      children: [{ text: '' }],
    });
    Transforms.insertNodes(editor, {
      children: [{ text: '' }],
      type: 'text',
    });
  },
};

/**
 * Converts a Slate `Descendant` node into a valid HTML string.
 * * This function handles the recursive transformation of Slate nodes, supporting:
 * - **Leaf formatting**: Bold (`<strong>`) and Underscore (`<u>`).
 * - **Element types**: Code blocks (`<pre><code>`), Images (`<img>`), and Paragraphs (`<p>`).
 * * @param node - The Slate node to be serialized. Can be an `Element` or `Text`.
 * @returns A string of serialized HTML. Returns an empty string if the node is not a valid element.
 * * @example
 * ```typescript
 * const node = { type: 'code', children: [{ text: 'const x = 10;', bold: true }] };
 * const html = serializeHtml(node);
 * // Result: <pre><code><strong>const x = 10;</strong></code></pre>
 * ```
 */
export function serializeHtml(node: Descendant): string {
  if (!Element.isElement(node)) {
    return '';
  }

  // for basic html elements
  const children: string = node.children
    .map(n => {
      if (Text.isText(n)) {
        let str = n.text;

        if (n.bold) {
          str = `<strong>${str}</strong>`;
        }

        if (n.underscore) {
          str = `<u>${str}</u>`;
        }

        if (n.code) {
          str = `<pre><code>${str}</code></pre>`;
        }

        return str;
      }

      return '';
    })
    .join('');

  // for more complex node types, meant for complex nested tags.
  switch (node.type) {
    case 'image':
      return `<img src=${node.url} width="${node.width}" />`;
    default:
      return `<p>${children}</p>`;
  }
}

export { deserialize };
