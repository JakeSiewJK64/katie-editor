import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomEditorElement;
    Text: CustomEditorTextElement;
  }
}

export type CustomEditorElementType = 'paragraph' | 'code' | 'image';

export type CustomEditorElementBase = {
  children: CustomEditorTextElement[];
};

export type StandardElement = CustomEditorElementBase & {
  type: 'code' | 'paragraph';
};

export type ImageElement = CustomEditorElementBase & {
  type: 'image';
  url: string;
  width?: number;
};

export type CustomEditorElement = ImageElement | StandardElement;

export type CustomEditorTextElement = {
  text?: string;
  bold?: boolean;
  underscore?: boolean;
  code?: boolean;
};

export type JSONExportMode = {
  mode: 'json';
  onSave?: (value: Descendant[]) => void;
};

export type HTMLExportMode = {
  mode: 'html';
  onSave?: (value: string) => void;
};

export type EditorProps = React.HTMLAttributes<HTMLDivElement> &
  (JSONExportMode | HTMLExportMode) & {
    initialValue: Descendant[];
  };
