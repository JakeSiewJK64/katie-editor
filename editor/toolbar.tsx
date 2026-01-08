import {
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuRedo,
  LuUnderline,
  LuUndo,
} from 'react-icons/lu';
import { withHistory } from 'slate-history';
import { useSlate } from 'slate-react';

import { cn, CustomEditorHelper } from './utils';

export function Toolbar() {
  const editor = withHistory(useSlate());

  return (
    <div className="mb-2 flex flex-row rounded border border-slate-300 p-1">
      <button
        title="Heading 1"
        className={cn(
          'cursor-pointer p-1 hover:bg-slate-300',
          CustomEditorHelper.isHeading1Active(editor) && 'bg-slate-300',
        )}
        onClick={() => CustomEditorHelper.toggleHeading1(editor)}
      >
        <LuHeading1 />
      </button>
      <button
        title="Heading 2"
        className={cn(
          'cursor-pointer p-1 hover:bg-slate-300',
          CustomEditorHelper.isHeading2Active(editor) && 'bg-slate-300',
        )}
        onClick={() => CustomEditorHelper.toggleHeading2(editor)}
      >
        <LuHeading2 />
      </button>
      <button
        title="Heading 3"
        className={cn(
          'cursor-pointer p-1 hover:bg-slate-300',
          CustomEditorHelper.isHeading3Active(editor) && 'bg-slate-300',
        )}
        onClick={() => CustomEditorHelper.toggleHeading3(editor)}
      >
        <LuHeading3 />
      </button>
      <button
        title="Code"
        className={cn(
          'cursor-pointer p-1 hover:bg-slate-300',
          CustomEditorHelper.isCodeBlockActive(editor) && 'bg-slate-300',
        )}
        onClick={() => CustomEditorHelper.toggleCodeBlock(editor)}
      >
        <LuCode />
      </button>
      <button
        title="Bold"
        className={cn(
          'cursor-pointer p-1 hover:bg-slate-300',
          CustomEditorHelper.isBoldMarkActive(editor) && 'bg-slate-300',
        )}
        onClick={() => CustomEditorHelper.toggleBoldMark(editor)}
      >
        <LuBold />
      </button>
      <button
        title="Underscore"
        className={cn(
          'cursor-pointer p-1 hover:bg-slate-300',
          CustomEditorHelper.isUnderscoreMarkActive(editor) && 'bg-slate-300',
        )}
        onClick={() => CustomEditorHelper.toggleUnderscoreMark(editor)}
      >
        <LuUnderline />
      </button>
      <button
        disabled={editor.history.undos.length === 0}
        title="Undo"
        className={cn(
          'p-1',
          editor.history.undos.length === 0
            ? 'cursor-not-allowed hover:bg-slate-50'
            : 'cursor-pointer hover:bg-slate-300',
        )}
        onClick={() => editor.undo()}
      >
        <LuUndo color={editor.history.undos.length === 0 ? 'gray' : 'black'} />
      </button>
      <button
        disabled={editor.history.redos.length === 0}
        title="Redo"
        className={cn(
          'p-1',
          editor.history.redos.length === 0
            ? 'cursor-not-allowed hover:bg-slate-50'
            : 'cursor-pointer hover:bg-slate-300',
        )}
        onClick={() => editor.redo()}
      >
        <LuRedo color={editor.history.redos.length === 0 ? 'gray' : 'black'} />
      </button>
    </div>
  );
}
