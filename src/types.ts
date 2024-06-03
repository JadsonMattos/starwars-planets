export type Planet = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string,
  [key: string]: any,
};

export type NumericFilterType = {
  column: string,
  comparison: string,
  value: string,
};

export type ContextType = {
  planets: Planet[],
  filterText: string,
  setFilterText: (filterText: string) => void,
  loading: boolean;
  numericFilter: NumericFilterType,
  setNumericFilter: (numericFilter: NumericFilterType) => void,
  planetsFiltered: Planet[],
  filteredPlanetsText: string,
  setPlanetsFiltered: (planetsFiltered: Planet[]) => void,
  filtersArray: NumericFilterType[],
  setFiltersArray: (filtersArray: NumericFilterType[]) => void,
  selectedColumns: string[],
  setSelectedColumns: (selectedColumns: string[]) => void,
  handleRemoveFilter: (column: string) => void,
  handleRemoveAll: () => void,
  order: { column: string, sort: string },
  setOrder: (order: string) => void,
};
