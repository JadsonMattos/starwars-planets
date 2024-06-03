import { createContext, useEffect, useState } from 'react';
import { ContextType, NumericFilterType, Planet } from '../types';
import { fetchPlanets } from '../services/planetsAPI';

export const PlanetsContext = createContext<ContextType>({} as ContextType);

const availableColumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export function PlanetsProvider({ children }: any) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [numericFilter, setNumericFilter] = useState<NumericFilterType>({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [loading, setLoading] = useState(true);
  const [planetsFiltered, setPlanetsFiltered] = useState<Planet[]>([]);
  const [filtersArray, setFiltersArray] = useState<NumericFilterType[]>([]);
  const [selectedColumns, setSelectedColumns] = useState(availableColumns);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const filteredPlanetsText = (text: string) => {
    return planets.filter((planet) => (
      planet.name.toLowerCase().includes(text.toLowerCase())
    ));
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const results = await fetchPlanets();
      setPlanets(results);
      setLoading(false);
      setPlanetsFiltered(results);
    };
    fetchAPI();
  }, []);

  const handleRemoveFilter = (columnName: string) => {
    const newFilters = filtersArray.filter((filter) => filter.column !== columnName);
    if (newFilters.length === 0) {
      setPlanetsFiltered(planets);
    }
    newFilters.forEach((newFilter) => {
      const { column, comparison, value } = newFilter;
      setPlanetsFiltered(planets.filter((planet) => {
        switch (comparison) {
          case 'maior que':
            return +planet[column] > +value;
          case 'menor que':
            return +planet[column] < +value;
          case 'igual a':
            return +planet[column] === +value;
          default:
            return true;
        }
      }));
    });
    setFiltersArray(newFilters);

    setSelectedColumns((prevSelectedColumns) => [...prevSelectedColumns, columnName]);
  };

  const handleRemoveAll = () => {
    setFiltersArray([]);
    setSelectedColumns([]);
  };

  const contextStory = {
    planets,
    filterText,
    setFilterText,
    numericFilter,
    setNumericFilter,
    loading,
    planetsFiltered,
    setPlanetsFiltered,
    filtersArray,
    setFiltersArray,
    filteredPlanetsText,
    selectedColumns,
    setSelectedColumns,
    handleRemoveFilter,
    handleRemoveAll,
    order,
    setOrder,
  };

  return (
    <PlanetsContext.Provider value={ contextStory }>
      { children }
    </PlanetsContext.Provider>
  );
}
