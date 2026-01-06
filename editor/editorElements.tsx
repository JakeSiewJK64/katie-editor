import React from 'react';
import { ImageElement } from 'editor/types';
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu';
import { Transforms } from 'slate';
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react';

import { cn } from './utils';

import type { RenderElementProps, RenderLeafProps } from 'slate-react';

/**
 * Renders individual leaf nodes within the editor text content.
 * * This component handles the visual representation of "leaves"—the smallest
 * units of text that share the same formatting. It specifically manages
 * boolean formatting marks like bolding.
 *
 * @param props - The properties provided by the editor's rendering engine.
 * @param props.attributes - Essential DOM attributes (like `data-slate-leaf`) required for editor functionality.
 * @param props.leaf - The custom text properties defined in your schema (e.g., `bold`, `italic`).
 * @param props.children - The actual text content to be rendered.
 * @returns JSX element
 */
export function CustomEditorLeaf(props: RenderLeafProps) {
  return (
    <span
      {...props.attributes}
      className={cn(
        props.leaf.bold && 'font-bold',
        props.leaf.underscore && 'underline',
      )}
    >
      {props.children}
    </span>
  );
}

function CustomImageRenderElement({
  onDelete = () => {},
  onSizeChange = () => {},
  onDragStart = () => {},
  ...props
}: ImageElement & {
  onDragStart: (e: React.DragEvent) => void;
  onDelete: () => void;
  onSizeChange: (newSize: number) => void;
}) {
  const STEP = 20;
  const [size, setSize] = React.useState(props.width || 300);

  const selected = useSelected();
  const focused = useFocused();

  React.useEffect(() => {
    onSizeChange(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <div
      className={cn(
        'w-fit rounded border border-slate-300 p-2',
        focused && selected && 'border-red-600',
      )}
      contentEditable={false}
    >
      <div className="mb-1 flex flex-row items-center justify-between gap-1">
        <div className="flex flex-row gap-1">
          <button
            title="Decrease width"
            className="cursor-pointer rounded border border-slate-300 p-1"
            onClick={() => setSize(prev => prev - STEP)}
          >
            <LuMinus />
          </button>
          <button
            title="Increase width"
            className="cursor-pointer rounded border border-slate-300 p-1"
            onClick={() => setSize(prev => prev + STEP)}
          >
            <LuPlus />
          </button>
        </div>
        <button
          title="Remove image"
          className="cursor-pointer rounded border border-slate-300 p-1 text-red-600"
          onClick={onDelete}
        >
          <LuTrash />
        </button>
      </div>
      <img width={size} src={props.url} onDragStart={onDragStart} />
    </div>
  );
}

export function CustomEditorRenderElement(props: RenderElementProps) {
  const editor = useSlateStatic();

  switch (props.element.type) {
    case 'code':
      return (
        <pre {...props}>
          <code className="text-red-600">{props.children}</code>
        </pre>
      );
    case 'image': {
      const nodeIndex = ReactEditor.findPath(editor, props.element);

      return (
        <CustomImageRenderElement
          {...props.element}
          onDragStart={e => {
            e.dataTransfer.setData('text/plain', '');
            e.dataTransfer.setData(
              'data-img',
              JSON.stringify({ ...props.element, nodeIndex }),
            );
          }}
          onSizeChange={newSize => {
            Transforms.setNodes(editor, { width: newSize }, { at: nodeIndex });
          }}
          onDelete={() => {
            Transforms.removeNodes(editor, {
              at: nodeIndex,
            });
          }}
        />
      );
    }
    default:
      return <p {...props}>{props.children}</p>;
  }
}
