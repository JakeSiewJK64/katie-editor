import { jsx } from 'slate-hyperscript';

import type { CustomEditorTextElement } from 'editor/types';
import type { Descendant } from 'slate';

function breakdownElements(
  element: ChildNode,
  attributes: NamedNodeMap & CustomEditorTextElement,
): Descendant[] {
  if (element.nodeType === Node.TEXT_NODE) {
    return [jsx('text', attributes, element.textContent)];
  }

  if (element.nodeType !== Node.ELEMENT_NODE) {
    return [jsx('text', {}, '')];
  }

  const nodeAttributes = { ...attributes };

  switch (element.nodeName) {
    case 'STRONG':
      nodeAttributes.bold = true;
  }

  const children = Array.from(element.childNodes).flatMap(node =>
    breakdownElements(node, nodeAttributes),
  );

  if (children.length === 0) {
    children.push(jsx('text', {}, ''));
  }

  switch (element.nodeName) {
    case 'P':
      return [jsx('element', nodeAttributes, children)];
    case 'IMG':
      if (element instanceof HTMLImageElement) {
        const url = element.getAttribute('src') || '';
        const width = element.getAttribute('width') || '300';

        return [
          jsx('element', { type: 'paragraph' }, [{ text: '' }]),
          {
            type: 'image',
            url,
            width: Number(width),
            children: [{ text: '' }],
          },
          jsx('element', { type: 'paragraph' }, [{ text: '' }]),
        ];
      }

      return [{ text: '' }];
    default:
      return children;
  }
}

/**
 * Converts a raw HTML string into a JSON-compatible `Descendant` array
 * that can be consumed by a Slate.js editor.
 * * @remarks
 * This function uses the browser's `DOMParser` to navigate the HTML tree.
 * If an empty string is provided, it defaults to a single empty paragraph
 * to maintain editor stability.
 *
 * @param htmlString - The raw HTML markup to be deserialized.
 * @returns An array of Slate `Descendant` objects (Elements or Text nodes).
 * * @example
 * ```ts
 * const slateValue = deserialize('<p>Hello <b>World</b></p>');
 * // Returns: [{ type: 'paragraph', children: [{ text: 'Hello ' }, { text: 'World', bold: true }] }]
 * ```
 * * @throws Will catch and log errors during the breakdown process,
 * returning a fallback empty text node to prevent editor crashes.
 */
export function deserialize(htmlString: string): Descendant[] {
  const htmlElement = new DOMParser().parseFromString(
    htmlString.length === 0 ? '<p></p>' : htmlString,
    'text/html',
  ).body;

  try {
    return breakdownElements(htmlElement, htmlElement.attributes);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return [jsx('text', {}, '')];
  }
}
