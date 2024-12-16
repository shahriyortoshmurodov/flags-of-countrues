document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get('code');

    if (countryCode) {
        fetchCountryDetails(countryCode);
    }
});

async function fetchCountryDetails(code) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const [country] = await response.json();
        displayCountryDetails(country);
    } catch (error) {
        console.error('Error fetching country details:', error);
    }
}

function displayCountryDetails(country) {
    const detailsBox = document.querySelector('.details-box');
    detailsBox.innerHTML = `
        <h1 class="details-title">${country.name.common}</h1>
        <img class="details-flag" src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <div class="details-content">
            <p class="details-info"><strong>Region:</strong> ${country.region}</p>
            <p class="details-info"><strong>Subregion:</strong> ${country.subregion}</p>
            <p class="details-info"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="details-info"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p class="details-info"><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        </div>
        <button class="back-button">
            <a href="./index.html">Back to Search</a>
        </button>
    `;
}
