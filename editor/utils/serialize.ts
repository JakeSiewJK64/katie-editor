import { Descendant, Element, Text } from 'slate';

import type { CustomEditorTextElement } from 'editor/types';

function iterateChildren(textChildren: CustomEditorTextElement[]) {
  return textChildren
    .map(n => {
      if (Text.isText(n)) {
        let str = `<p>${n.text}</p>`;

        if (n.heading1) {
          str = `<h1>${str}</h1>`;
        } else if (n.heading2) {
          str = `<h2>${str}</h2>`;
        } else if (n.heading3) {
          str = `<h3>${str}</h3>`;
        }

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
    })
    .join('');
}

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
    return `<p>${node.text}</p>`;
  }

  if (node.type === 'image') {
    return `<img src="${node.url}" width="${node.width}" />`;
  }

  if (node.type === 'list-item') {
    return `<li>${iterateChildren(node.children)}</li>`;
  }

  if (node.type === 'numbered-list') {
    return `<ol>\n${node.children.map(listItem => `<li>${iterateChildren(listItem.children)}</li>`).join('\n')}\n</ol>`;
  }

  // for basic html elements
  return iterateChildren(node.children);
}
