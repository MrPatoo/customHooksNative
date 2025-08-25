import { useState, useEffect } from 'react';

export function useCharacters(initialPage = 1, initialFilters = {}) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [info, setInfo] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = 'https://rickandmortyapi.com/api/character';

  const buildUrl = (pageNum = 1, filters = {}) => {
    const params = new URLSearchParams({ page: pageNum, ...filters });
    return `${BASE_URL}?${params.toString()}`;
  };

  async function loadCharacters(pageNum = page, filterParams = filters) {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(pageNum, filterParams));
      if (!res.ok) throw new Error('Error cargando personajes');
      const data = await res.json();
      setCharacters(data.results);
      setInfo(data.info);
      setPage(pageNum);
      setFilters(filterParams);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return {
    characters,
    info,
    page,
    filters,
    loading,
    error,
    loadCharacters,
    setPage,
    setFilters,
  };
}
