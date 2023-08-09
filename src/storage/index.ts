import { Snippet } from '../interface';

export const get = (): Snippet[] | null => {
  const snippets = window.localStorage.getItem('snippets');
  if (!snippets) return null;
  return JSON.parse(snippets);
};

export const update = (payload: Snippet): Snippet[] | null => {
  if (payload.id) {
    const snippets = window.localStorage.getItem('snippets');

    if (!snippets) return null;

    const parsedSnippets = JSON.parse(snippets);
    const index = parsedSnippets.findIndex((snippet: Snippet) => snippet.id === payload.id);
    parsedSnippets.splice(index, 0);
    parsedSnippets.splice(index, 1, payload);

    window.localStorage.setItem('snippets', JSON.stringify(parsedSnippets));
    return parsedSnippets;
  }

  return null;
};

export const create = (payload: Snippet): Snippet[] => {
  const snippets = window.localStorage.getItem('snippets');
  if (snippets) {
    const parsedSnippets = JSON.parse(snippets);
    const newSnippets = [...parsedSnippets, payload];

    window.localStorage.setItem('snippets', JSON.stringify(newSnippets));

    return newSnippets;
  }

  window.localStorage.setItem('snippets', JSON.stringify([payload]));

  return [payload];
};

export const remove = (id: string): Snippet[] => {
  const snippets = window.localStorage.getItem('snippets');
  if (snippets) {
    const parsedSnippets = JSON.parse(snippets);
    const index = parsedSnippets.findIndex((snippet: Snippet) => snippet.id === id);
    parsedSnippets.splice(index, 1);

    window.localStorage.setItem('snippets', JSON.stringify(parsedSnippets));
    return parsedSnippets;
  }

  return [];
};
