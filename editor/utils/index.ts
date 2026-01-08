import { clsx } from 'clsx';
import { Editor, Transforms } from 'slate';
import { twMerge } from 'tailwind-merge';

import { deserialize } from './deserialize';
import { serializeHtml } from './serialize';

import type { ClassValue } from 'clsx';
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
