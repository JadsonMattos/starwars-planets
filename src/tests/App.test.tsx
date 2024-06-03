import React from 'react';
import { vi } from 'vitest';
import testData from '../../cypress/mocks/testData';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { PlanetsProvider } from '../context/PlanetsContext';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  const mockResponse = {
    ok: true,
    status: 200,
    json: async () => (testData),
  } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
});
afterEach(() => vi.clearAllMocks());

it('renderiza tabela', async () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  expect(global.fetch).toHaveBeenCalled();
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  const headers = await screen.findAllByRole('columnheader');
  const rows = await screen.findAllByRole('row');
  expect(headers).toHaveLength(13);
  expect(rows).toHaveLength(11);
});

it('testa o campo de texto por digitação', async () => {
  const { getByTestId, findAllByRole } = render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  const nameFilter = getByTestId('name-filter');
  expect(getByTestId('name-filter')).toBeInTheDocument();
  userEvent.type(nameFilter, "o");
  userEvent.clear(nameFilter);
  const filteredPlanets = await findAllByRole('cell');
  expect(filteredPlanets[0].textContent).toBe('Tatooine');
});

it('testa o filtro de valores numéricos', async () => {
  const { getByTestId } = render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  expect(getByTestId('column-filter')).toBeInTheDocument();
  const options = getByTestId('column-filter').querySelectorAll('option');
  expect(options.length).toBe(5);
  expect(options[0].textContent).toBe('population');
  expect(options[1].textContent).toBe('orbital_period');
  expect(options[2].textContent).toBe('diameter');
  expect(options[3].textContent).toBe('rotation_period');
  expect(options[4].textContent).toBe('surface_water');

  expect(getByTestId('comparison-filter')).toBeInTheDocument();
  const Comparison = getByTestId('comparison-filter').querySelectorAll('option');
  expect(Comparison.length).toBe(3);
  expect(Comparison[0].textContent).toBe('maior que');
  expect(Comparison[1].textContent).toBe('menor que');
  expect(Comparison[2].textContent).toBe('igual a');

  const columnFilter = getByTestId('column-filter');
  userEvent.selectOptions(columnFilter, 'population');
  const comparisonFilter = getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilter, 'menor que');
  const valueFilter = getByTestId('value-filter');
  userEvent.type(valueFilter, '1000000');
  const buttonFilter = getByTestId('button-filter');
  userEvent.click(buttonFilter);
  waitFor(() => {
    const rows = screen.findAllByRole('row');
    expect(rows).toHaveLength(3);
  })
});

it('testa filtragem de múltiplos valores numéricos', async () => {
  const { getByTestId } = render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  expect(getByTestId('column-filter')).toBeInTheDocument();
  userEvent.selectOptions(getByTestId('column-filter'), 'orbital_period');
  userEvent.selectOptions(getByTestId('comparison-filter'), 'maior que');
  userEvent.type(getByTestId('value-filter'), '400');
  const filterButton = screen.getByTestId('button-filter');
  userEvent.click(filterButton);
  waitFor(async () => {
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(6);
  })
  userEvent.selectOptions(getByTestId('column-filter'), 'diameter');
  userEvent.selectOptions(getByTestId('comparison-filter'), 'menor que');
  userEvent.type(getByTestId('value-filter'), '10000');
  userEvent.click(getByTestId('button-filter'));
  waitFor(() => {
    const rows = screen.findAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});

// it('testa a não utilização de filtros repetidos', async () => {
//   render(
//     <PlanetsProvider>
//       <App />
//     </PlanetsProvider>
//   );
//   waitFor(() => expect(screen.getByTestId('column-filter')).toBeInTheDocument());
//   const columnFilterSelect1 = screen.getByTestId('column-filter');
//   const comparisonFilterSelect1 = screen.getByTestId('comparison-filter');
//   const valueFilterInput1 = screen.getByTestId('value-filter');
//   const filterButton1 = screen.getByTestId('button-filter');
//   userEvent.selectOptions(columnFilterSelect1, 'population');
//   userEvent.selectOptions(comparisonFilterSelect1, 'maior que');
//   userEvent.type(valueFilterInput1, '100000');
//   userEvent.click(filterButton1);
//   const columnFilterSelect2 = screen.getByTestId('column-filter');
//   const comparisonFilterSelect2 = screen.getByTestId('comparison-filter');
//   const valueFilterInput2 = screen.getByTestId('value-filter');
//   const filterButton2 = screen.getByTestId('button-filter');
//   expect(screen.queryByText('population')).not.toBeInTheDocument();
//   userEvent.selectOptions(columnFilterSelect2, 'diameter');
//   userEvent.selectOptions(comparisonFilterSelect2, 'menor que');
//   userEvent.type(valueFilterInput2, '8000');
//   userEvent.click(filterButton2);
//   expect(screen.queryByText('diameter')).not.toBeInTheDocument();
// });