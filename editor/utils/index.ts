import { clsx } from 'clsx';
import { Editor, Element, Transforms } from 'slate';
import { twMerge } from 'tailwind-merge';

import { deserialize } from './deserialize';
import { serializeHtml } from './serialize';

import type { ClassValue } from 'clsx';
import type { ReactEditor } from 'slate-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to check if the list is currently active
function isBlockActive(editor: ReactEditor, format: string) {
  const [match] = editor.nodes({
    match(node): node is Element {
      if (Element.isElement(node)) {
        return node.type === format;
      }

      return false;
    },
  });

  return !!match;
}

export const CustomEditorHelper = {
  isNumberedListActive(editor: ReactEditor) {
    return isBlockActive(editor, 'numbered-list');
  },
  toggleNumberedList(editor: ReactEditor) {
    const isActive = CustomEditorHelper.isNumberedListActive(editor);

    // 1. Unwrap existing list containers to flatten the structure
    Transforms.unwrapNodes(editor, {
      match: n => Element.isElement(n) && n.type === 'numbered-list',
      split: true,
    });

    // 2. Toggle the block type
    // If active, turn back to 'paragraph'. If not, turn to 'list-item'.
    // We do NOT pass 'children' here so we keep the existing text.
    Transforms.setNodes(editor, {
      type: isActive ? 'text' : 'list-item',
    });

    // 3. Wrap in the <ol> parent if we are enabling the list
    if (!isActive) {
      Transforms.wrapNodes(editor, { type: 'numbered-list', children: [] });
    }
  },
  isHeading1Active(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.heading1 : false;
  },
  isHeading2Active(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.heading2 : false;
  },
  isHeading3Active(editor: ReactEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.heading3 : false;
  },
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
  toggleHeading1(editor: ReactEditor) {
    const isActive = CustomEditorHelper.isHeading1Active(editor);

    if (isActive) {
      editor.removeMark('heading1');
      return;
    }

    editor.removeMark('heading2');
    editor.removeMark('heading3');
    editor.addMark('heading1', true);
  },
  toggleHeading2(editor: ReactEditor) {
    const isActive = CustomEditorHelper.isHeading2Active(editor);

    if (isActive) {
      editor.removeMark('heading2');
      return;
    }

    editor.removeMark('heading1');
    editor.removeMark('heading3');
    editor.addMark('heading2', true);
  },
  toggleHeading3(editor: ReactEditor) {
    const isActive = CustomEditorHelper.isHeading3Active(editor);

    if (isActive) {
      editor.removeMark('heading3');
      return;
    }

    editor.removeMark('heading1');
    editor.removeMark('heading2');
    editor.addMark('heading3', true);
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
  insertImage(editor: ReactEditor, url: string, width: number) {
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

export { deserialize, serializeHtml };
