const url = "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca2";
// Recuperation du bouton et de la zone pour le drapeau
const button = document.querySelector(".select_country");
const flag_container = document.querySelector(".show_flag");

let countriesCache= [];
// Recuperation de l'API
async function fetchCountries() {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erreur API");
  const data = await res.json();

  return data
    .filter(c => c?.name?.common && (c?.flags?.svg || c?.flags?.png) && c?.region)
    .map(c => ({
      name: c.name.common,
      flag: c.flags.svg || c.flags.png,
      region: c.region,
      code: c.cca2,
      capital: c.capital?.[0] || "Inconnue",
      population: c.population || 0
    }));
}


function getRandomCountry(countries) {
    const index = Math.floor(Math.random()*countries.length);
    return countries[index];
}
async function showRandomFlag() {
    try{
        if (countriesCache.length === 0){
            countriesCache = await fetchCountries();
        }
        const country = getRandomCountry(countriesCache);
        flag_container.innerHTML =`
            <img src="${country.flag}" alt="Drapeau de ${country.name}" width="400px">
            
        `
    } catch (error) {
        console.error(error);
        flag_container.innerHTML = `<p>Impossible de charger les pays.</p>`;
    }
}

button.addEventListener("click", showRandomFlag);