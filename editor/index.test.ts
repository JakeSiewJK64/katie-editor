import { Descendant } from 'slate';
import { describe, expect, it } from 'vitest';

import { deserialize, serializeHtml } from './utils';

describe('serialize html ', () => {
  it('should be able to serialize basic node to html string.', () => {
    const htmlString = serializeHtml({
      type: 'text',
      children: [{ text: 'something' }],
    });

    expect(htmlString).toBe('<p>something</p>');
  });

  it('should be able to serialize basic node to paragraph if invalid slate node.', () => {
    const htmlString = serializeHtml({
      text: 'something',
    });

    expect(htmlString).toBe('<p>something</p>');
  });

  it('it should be able to serialize image node with proper attributes.', () => {
    const htmlString = serializeHtml({
      type: 'image',
      url: 'source',
      width: 10,
      children: [{ text: '' }],
    });

    expect(htmlString).toBe('<img src="source" width="10" />');
  });
});

describe('deserialize html', () => {
  it('can deserialize basic html elements.', () => {
    expect(deserialize('<strong>something</strong>')).toStrictEqual<
      Descendant[]
    >([{ bold: true, children: [{ text: 'something' }] }]);
  });
});
