import { LuBold, LuRedo, LuUnderline, LuUndo } from 'react-icons/lu';
import { HistoryEditor } from 'slate-history';

import { cn, CustomEditorHelper } from './utils';

import type { ReactEditor } from 'slate-react';

type ToolbarProps = {
  editor: ReactEditor & HistoryEditor;
};

export function Toolbar({ editor }: ToolbarProps) {
  return (
    <div className="mb-2 flex flex-row rounded border border-slate-300 p-1">
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
