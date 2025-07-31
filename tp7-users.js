//Recupérer le button switch (tableu | grille)  et ajouter un EventListener
const radioAffichage = document.querySelectorAll(
    'input[name="radio-affichage"]'
);
radioAffichage.forEach((element) => {
    element.addEventListener("change", showData);
});

//Recupérer la liste de selection et ajouter un EventListener
const select = document.querySelector("#filter-category");
select.addEventListener("change", search);

//Recupérer le screen, pour laffichage des données
const screen = document.getElementById("screen");

//Fait la requête pour les données
async function getUsers() {
    try {
        const response = await fetch("./data.json");
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Erreur :", error);
    }
}
//fonction showData() sera appelée au chargement de la page
//Elle surveille l´etat des radiosButtons tableau et grille
//Et appelle la fonction dediée pour afficher les données au format souhaité
function showData() {
    const selected = document.querySelector(
        'input[name="radio-affichage"]:checked'
    );
    const title = document.getElementById("title");

    if (selected.id == "tableau") {
        title.innerText = "Affichage des données dans un tableau";
        getUsers().then((users) => {
            showAsTable(users);
        });
    } else {
        title.innerText = "Affichage des données dans une grille";
        getUsers().then((users) => {
            showAsGrid(users);
        });
    }
}

//filtre les données en fonction de la saisie de l´utilisateur et
//Affiche avec les fonctions showAsTable() et showAsGrid()
function search() {
    const searchInput = document.getElementById("search-input");
    const searchCriteria = searchInput.value.toLowerCase();
    const selectedCategory = document.querySelector("#filter-category").value;

    switch (selectedCategory) {
        case "optName":
            filterByName(searchCriteria);
            break;
        case "optPhone":
            filterByPhone(searchCriteria);
            break;
        case "optAddress":
            filterByAddress(searchCriteria);
            break;
    }
}

//filtre les users par le nom complet
function filterByName(searchCriteria) {
    const selected = document.querySelector(
        'input[name="radio-affichage"]:checked'
    );
    let filteredUsers;
    if (selected.id == "tableau") {
        getUsers().then((users) => {
            filteredUsers = users.filter((user) => {
                return user.name.toLowerCase().includes(searchCriteria);
            });
            showAsTable(filteredUsers);
        });
    } else {
        getUsers().then((users) => {
            filteredUsers = users.filter((user) => {
                return user.name.toLowerCase().includes(searchCriteria);
            });
            showAsGrid(filteredUsers);
        });
    }
}

//Filtre les users par leur numéro de téléphone
function filterByPhone(searchCriteria) {
    const selected = document.querySelector(
        'input[name="radio-affichage"]:checked'
    );
    let filteredUsers;
    if (selected.id == "tableau") {
        getUsers().then((users) => {
            filteredUsers = users.filter((user) => {
                return user.phone.toLowerCase().includes(searchCriteria);
            });
            showAsTable(filteredUsers);
        });
    } else {
        getUsers().then((users) => {
            filteredUsers = users.filter((user) => {
                return user.phone.toLowerCase().includes(searchCriteria);
            });
            showAsGrid(filteredUsers);
        });
    }
}

//Filtre les users par leur adresse (le nom de rue)
function filterByAddress(searchCriteria) {
    const selected = document.querySelector(
        'input[name="radio-affichage"]:checked'
    );
    let filteredUsers;
    if (selected.id == "tableau") {
        getUsers().then((users) => {
            filteredUsers = users.filter((user) => {
                return user.address.street
                    .toLowerCase()
                    .includes(searchCriteria);
            });
            showAsTable(filteredUsers);
        });
    } else {
        getUsers().then((users) => {
            filteredUsers = users.filter((user) => {
                return user.address.street
                    .toLowerCase()
                    .includes(searchCriteria);
            });
            showAsGrid(filteredUsers);
        });
    }
}

//Affiche les données sous format de grille
function showAsGrid(data) {
    //Transformation des données à l´aide de map
    //map prendra chacun des user de data, le transformera et l´ajoutera au tableau users
    const users = data.map(
        (user) =>
            `
            <div class="col border border-2 bg-info-subtle p-2">
                <p>${user.id}</p>
                <p class="fw-bold">
                ${user.name}</p>
                <p>${user.phone}</p>
                <p>${user.email}</p>
                <p>${user.company.name}</p>
                <p>${user.address.street}</p>
            </div>
            `
    );

    screen.innerHTML = `
        <div class="container text-center">
            <div class="row row-cols-2">${users.join(" ")}</div>
        </div>`;
}

function showAsTable(data) {
    //Transformation des données à l´aide de map
    //map prendra chacun des user de data, le transformera et l´ajoutera au tableau users
    const users = data.map(
        (user) =>
            `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.company.name}</td>
                <td>${user.address.street}</td>
            </tr>`
    );

    //Création du tableau pour acceuillir les données et les afficher
    let table = `
    <table class="table table-striped my-3">
        <thead>
            <tr>
            <th class="bg-secondary text-light">Id</th>
                <th class="bg-secondary text-light">Nom</th>
                <th class="bg-secondary text-light">Télephone</th>
                <th class="bg-secondary text-light">Email</th>
                <th class="bg-secondary text-light">Compagnie</th>
                <th class="bg-secondary text-light">Rue</th>
            </tr>
        </thead>
        <tbody id="tbody-users">${users.join(" ")}</tbody>
    </table>`;

    screen.innerHTML = table;
}
