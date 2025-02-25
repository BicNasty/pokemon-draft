// Add these new variables at the top with the other global variables
let currentView = 'cards';
let currentSortColumn = 'name';
let sortDirection = 1; // 1 for ascending, -1 for descending

function toggleView(view) {
    currentView = view;
    document.getElementById('pokemon-pool').classList.toggle('hidden', view === 'table');
    document.getElementById('pokemon-pool-table').classList.toggle('hidden', view === 'cards');
    updateDisplay();
}

function sortTable(column) {
    if (currentSortColumn === column) {
        sortDirection *= -1;
    } else {
        currentSortColumn = column;
        sortDirection = 1;
    }
    updateDisplay();
}

function getSortValue(pokemon, column) {
    switch(column) {
        case 'name': return pokemon.name;
        case 'hp': return pokemon.stats[0].value;
        case 'attack': return pokemon.stats[1].value;
        case 'defense': return pokemon.stats[2].value;
        case 'spAtk': return pokemon.stats[3].value;
        case 'spDef': return pokemon.stats[4].value;
        case 'speed': return pokemon.stats[5].value;
        default: return 0;
    }
}

// Modify the updateDisplay function to handle both views
function updateDisplay() {
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('current-player').textContent = `${currentPlayer.name}'s turn`;

    if (currentView === 'table') {
        updateTableView();
    } else {
        updateCardView();
    }

    updateTeamsDisplay();
}

function updateTableView() {
    const tableBody = document.getElementById('pokemon-table-body');
    tableBody.innerHTML = '';

    // Sort the pokemon pool
    const sortedPokemon = [...pokemonPool].sort((a, b) => {
        const aValue = getSortValue(a, currentSortColumn);
        const bValue = getSortValue(b, currentSortColumn);
        return (aValue > bValue ? 1 : -1) * sortDirection;
    });

    sortedPokemon.forEach(pokemon => {
        const row = document.createElement('tr');
        const statsMap = pokemon.stats.reduce((acc, stat) => {
            acc[stat.name] = stat.value;
            return acc;
        }, {});

        const typesHTML = pokemon.types
            .map(type => `<span class="type-badge type-badge-small type-${type}">${type}</span>`)
            .join('');

        row.innerHTML = `
            <td><img src="${pokemon.image}" alt="${pokemon.name}"></td>
            <td>${pokemon.name}</td>
            <td>${statsMap['hp']}</td>
            <td>${statsMap['attack']}</td>
            <td>${statsMap['defense']}</td>
            <td>${statsMap['special-attack']}</td>
            <td>${statsMap['special-defense']}</td>
            <td>${statsMap['speed']}</td>
            <td>${typesHTML}</td>
            <td><button class="table-select-btn" onclick="selectPokemon(${JSON.stringify(pokemon)})">Select</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function updateCardView() {
    // Existing card view code...
    const poolDiv = document.getElementById('pokemon-pool');
    poolDiv.innerHTML = '';
    // ... rest of the existing card view code
}