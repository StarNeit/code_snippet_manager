import React from 'react';
import { Snippet } from '../interface';

interface Props {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  data: Snippet;
}

function SnippetListItem({ onView, onEdit, onDelete, data }: Props) {
  return (
    <div className="flex items-center py-2 text-white gap-4">
      <div className="w-1/4 truncate font-semibold">{data.title}</div>
      <div className="flex-1 truncate text-slate-400">{data.description}</div>
      <div className="flex gap-2">
        <button className="bg-green-600 text-white py-1 px-2" onClick={onView}>
          View
        </button>
        <button className="bg-sky-600 text-white py-1 px-2" onClick={onEdit}>
          Edit
        </button>
        <button className="bg-rose-600 text-white py-1 px-2" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default SnippetListItem;
