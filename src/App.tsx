import React from 'react';
import './App.css';
import { Table } from './components/Table';
import { PlanetsProvider } from './context/PlanetsContext';
import { FilterInput } from './components/FilterInput';
import { NumericFilter } from './components/NumericFilter';

function App() {
  return (
    <PlanetsProvider>
      <span>Star Wars</span>
      <FilterInput />
      <NumericFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
