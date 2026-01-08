import { Descendant, Element, Text } from 'slate';

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
