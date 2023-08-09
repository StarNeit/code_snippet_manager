import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Snippet } from '../interface';

interface Props {
  onClose: () => void;
  data: Snippet;
}

function ViewSnippetModal({ onClose, data }: Props) {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full flex justify-center items-center backdrop-blur">
      <div className="bg-slate-700 w-3/5 p-4 h-[calc(100% - 100px)]">
        <div className="flex justify-end">
          <span className="cursor-pointer text-white hover:text-gray-400" onClick={onClose}>
            &#10005;
          </span>
        </div>

        <h3 className="text-white font-semibold text-xl">{data.title}</h3>
        <p className="text-gray-200">{data.description}</p>

        <div className="pt-4">
          <SyntaxHighlighter language="javascript">{data.code}</SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default ViewSnippetModal;
