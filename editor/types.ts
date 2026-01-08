import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: TextElement | ImageElement;
    Text: CustomEditorTextElement;
  }
}

export type ImageElement = {
  type: 'image';
  url: string;
  width: number;
  children: CustomEditorTextElement[];
};

export type TextElement = { type: 'text'; children: CustomEditorTextElement[] };

export type CustomEditorTextElement = {
  text?: string;
  bold?: boolean;
  underscore?: boolean;
  code?: boolean;
  heading1?: boolean;
  heading2?: boolean;
  heading3?: boolean;
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
