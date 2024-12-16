
async function Davlatlar() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';

    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'card';

        const flagImg = document.createElement('img');
        flagImg.src = country.flags.svg;
        flagImg.alt = `Flag of ${country.name.common}`;

        const textDiv = document.createElement('div');
        textDiv.className = 'card-text';

        const countryName = document.createElement('h2');
        countryName.textContent = country.name.common;
        countryName.className = 'country-name';

        countryName.addEventListener('click', () => {
            const countryCode = country.cca3;
            window.location.href = `details.html?code=${countryCode}`;
        });

        textDiv.appendChild(countryName);
        card.appendChild(flagImg);
        card.appendChild(textDiv);
        cardContainer.appendChild(card);
    });
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        const countryName = card.querySelector('.country-name').textContent.toLowerCase();
        card.style.display = countryName.includes(searchQuery) ? 'block' : 'none';
    });
});

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

Davlatlar();