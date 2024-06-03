import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import { Planet } from '../types';

export function Table() {
  const {
    loading,
    planets,
    planetsFiltered,
    filterText,
    filtersArray,
    handleRemoveFilter,
  } = useContext(PlanetsContext);

  if (loading || !planets) return (<p>Loading...</p>);

  const headers = planets.length > 0 ? Object.keys(planets[0]) : [];

  return (
    <>
      <div>
        { filtersArray.map((filter, index) => (
          <div key={ index } data-testid="filter">
            { filter.column }
            { filter.comparison }
            { filter.value }
            <button type="button" onClick={ () => handleRemoveFilter(filter.column) }>
              X
            </button>
          </div>
        )) }
      </div>
      <table>
        <thead>
          <tr>
            { headers.map((header) => (
              <th key={ header }>{ header }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { planetsFiltered.filter((planet) => (planet.name.toLowerCase()
            .includes(filterText.toLowerCase())))
            .map((planet: Planet, index: number) => (
              <tr key={ index }>
                { headers.map((header) => (
                  <td
                    key={ header }
                    data-testid={ header === 'name'
                      && 'planet-name' }
                  >
                    { planet[header] }
                  </td>
                )) }
              </tr>
            )) }
        </tbody>
      </table>
    </>
  );
}
