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
