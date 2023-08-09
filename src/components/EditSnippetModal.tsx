import React, { ChangeEvent, useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Snippet } from '../interface';

interface Props {
  onClose: () => void;
  onSave: (payload: Snippet) => void;
  data: Snippet | null;
};

function EditSnippetModal({ onClose, onSave, data }: Props) {
  const [code, setCode] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    if (data) {
      setCode(data.code);
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [data]);

  const handleSubmit = () => {
    if (code && title && description) {
      onSave({
        title,
        description,
        code
      });
      onClose();
    }
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full flex justify-center items-center backdrop-blur">
      <div className="bg-slate-700 w-3/5 p-4 h-[500px] flex flex-col">
        <div className="flex justify-end mb-2">
          <span className="cursor-pointer text-white hover:text-gray-400" onClick={onClose}>
            &#10005;
          </span>
        </div>

        <input
          className="py-1 px-2 bg-slate-500 text-white focus:outline-none w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={handleChangeTitle}
        />
        <input
          className="py-1 px-2 bg-slate-500 text-white focus:outline-none w-full mb-2"
          placeholder="Description"
          value={description}
          onChange={handleChangeDescription}
        />

        <div className="mt-4 overflow-auto flex-1">
          <Editor
            className="bg-white border-0 h-full"
            value={code}
            onValueChange={setCode}
            highlight={(value) => highlight(value, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14
            }}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button className="bg-rose-600 text-white py-1 px-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-sky-600 text-white py-1 px-2" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSnippetModal;
