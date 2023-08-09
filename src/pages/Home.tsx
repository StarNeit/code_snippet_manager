import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditSnippetModal from '../components/EditSnippetModal';
import SnippetListItem from '../components/SnippetListItem';
import ViewSnippetModal from '../components/ViewSnippetModal';
import { Snippet } from '../interface';
import { create, update, remove, get } from '../storage';

function Home() {
  const [isOpenEditSnippetModal, setIsOpenEditSnippetModal] = useState(false);
  const [isOpenViewSnippetModal, setIsOpenViewSnippetModal] = useState(false);

  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [detailSnippet, setDetailSnippet] = useState<null | Snippet>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const initialData = get();
    if (initialData) setSnippets(initialData);
  }, []);

  const searchedSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const key = search.toLowerCase();
      return snippet.title.toLowerCase().includes(key) || snippet.description.toLowerCase().includes(key);
    });
  }, [search, snippets]);

  const handleViewSnippet = (data: Snippet) => {
    setIsOpenViewSnippetModal(true);
    setDetailSnippet(data);
  };

  const handleEditSnippet = (data: Snippet) => {
    setIsOpenEditSnippetModal(true);
    setDetailSnippet(data);
  };

  const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDeleteSnippet = (data: Snippet) => {
    if (data.id) {
      const result = remove(data.id);
      setSnippets(result);
    }
  };

  const handleCloseModal = () => {
    setIsOpenEditSnippetModal(false);
    setIsOpenViewSnippetModal(false);
    setDetailSnippet(null);
  };

  const handleCreate = (payload: Snippet) => {
    if (detailSnippet) {
      const result = update({
        ...payload,
        id: detailSnippet.id
      });
      if (result) setSnippets(result);
    } else {
      const result = create({
        ...payload,
        id: uuidv4()
      });
      setSnippets(result);
    }
  };

  return (
    <div className="bg-slate-900 p-5 flex flex-col h-full">
      <h3 className="text-white font-bold text-2xl text-center mb-6">Code Snippet Manager</h3>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 py-1 px-2 bg-slate-700 text-white focus:outline-none"
          placeholder="Search..."
          value={search}
          onChange={handleChangeSearchValue}
        />
        <button className="bg-sky-600 text-white py-1 px-2" onClick={() => setIsOpenEditSnippetModal(true)}>
          Add New
        </button>
      </div>

      <div className="flex-1 overflow-auto mt-4">
        {searchedSnippets.map((snippet) => (
          <SnippetListItem
            data={snippet}
            onView={() => handleViewSnippet(snippet)}
            onEdit={() => handleEditSnippet(snippet)}
            onDelete={() => handleDeleteSnippet(snippet)}
          />
        ))}
      </div>

      {isOpenEditSnippetModal && (
        <EditSnippetModal data={detailSnippet} onClose={handleCloseModal} onSave={handleCreate} />
      )}
      {isOpenViewSnippetModal && detailSnippet && <ViewSnippetModal data={detailSnippet} onClose={handleCloseModal} />}
    </div>
  );
}

export default Home;
