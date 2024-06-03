import { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

export function FilterInput() {
  const { filterText, setFilterText } = useContext(PlanetsContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setFilterText(text);
  };

  return (
    <div>
      <input
        type="text"
        value={ filterText }
        placeholder="Filtrar..."
        data-testid="name-filter"
        onChange={ handleInputChange }
      />
    </div>
  );
}
