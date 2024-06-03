export const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const planets = data.results.map((planet: any) => {
    delete planet.residents;
    return planet;
  });
  return planets;
};
