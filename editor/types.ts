import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: TextElement | ImageElement;
    Text: CustomEditorTextElement;
  }
}

type ImageElement = {
  type: 'image';
  url: string;
  width?: number;
  children: CustomEditorTextElement[];
};

type TextElement = { type: 'text'; children: CustomEditorTextElement[] };

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
