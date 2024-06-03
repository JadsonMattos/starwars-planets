import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export function NumericFilter() {
  const {
    numericFilter,
    setNumericFilter,
    planetsFiltered,
    setPlanetsFiltered,
    filtersArray,
    setFiltersArray,
    selectedColumns,
    setSelectedColumns,
    handleRemoveAll,
    order,
    setOrder,
    planets,
  } = useContext(PlanetsContext);

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumericFilter({ ...numericFilter, column: event.target.value });
  };

  const columnOptions = selectedColumns.map((availableColumn) => (
    <option key={ availableColumn } value={ availableColumn }>
      { availableColumn }
    </option>
  ));

  const handleComparisonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumericFilter({ ...numericFilter, comparison: event.target.value });
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumericFilter({ ...numericFilter, value: (event.target.value) });
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const newFilter = {
      column: numericFilter.column,
      comparison: numericFilter.comparison,
      value: numericFilter.value,
    };

    setFiltersArray([...filtersArray, newFilter]);

    const filteredPlanets = planetsFiltered.filter((planet) => {
      const columnValue = parseInt(planet[numericFilter.column], 10);
      const filterValue = numericFilter.value;
      switch (numericFilter.comparison) {
        case 'maior que':
          return +columnValue > +filterValue;
        case 'menor que':
          return +columnValue < +filterValue;
        case 'igual a':
          return +columnValue === +filterValue;
        default:
          return true;
      }
    });
    setPlanetsFiltered(filteredPlanets);
    const newColumnOption = selectedColumns
      .filter((column) => column !== numericFilter.column);
    setNumericFilter({ ...numericFilter, column: newColumnOption[0] });
    setSelectedColumns(newColumnOption);
  };

  function compareValues() {
    return (a: any, b: any) => {
      const columnA = a[order.column] ?? 0;
      const columnB = b[order.column] ?? 0;
      if (columnA === 'unknown' && columnB === 'unknown') return 0;
      if (columnA === 'unknown') return 1;
      if (columnB === 'unknown') return -1;
      if (Number.isNaN(columnA)) {
        return 1;
      }
      if (Number.isNaN(columnB)) {
        return -1;
      }
      if (order.sort === 'ASC') {
        return columnA - columnB;
      }
      return columnB - columnA;
    };
  }

  const handleSortOrder = () => {
    const sortedPlanets = [...planets].sort(compareValues());
    setPlanetsFiltered(sortedPlanets);
  };

  return (
    <form onSubmit={ (event) => event.preventDefault }>
      <select
        name="column"
        title="Coluna"
        value={ numericFilter.column }
        data-testid="column-filter"
        onChange={ handleColumnChange }
      >
        { columnOptions }
      </select>
      <select
        name="comparison"
        title="Operador"
        value={ numericFilter.comparison }
        data-testid="comparison-filter"
        onChange={ handleComparisonChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="text"
        data-testid="value-filter"
        placeholder="Valor"
        value={ numericFilter.value }
        onChange={ handleValueChange }
      />
      <button data-testid="button-filter" onClick={ (event) => handleFilterClick(event) }>
        Filtrar
      </button>
      <select
        name="columnSort"
        title="Ordenar"
        value={ order.column }
        data-testid="column-sort"
        onChange={ (event) => setOrder({ ...order, column: event.target.value }) }
      >
        { columnOptions }
      </select>
      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          name="order"
          data-testid="column-sort-input-asc"
          value="ASC"
          checked={ order.sort === 'ASC' }
          onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
        />
        ASC
      </label>
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          name="order"
          data-testid="column-sort-input-desc"
          value="DESC"
          checked={ order.sort === 'DESC' }
          onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSortOrder() }
      >
        Ordenar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ () => handleRemoveAll() }
      >
        Remover todas filtragens
      </button>
    </form>
  );
}
