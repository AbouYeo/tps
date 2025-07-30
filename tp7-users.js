const radioAffichage = document.querySelectorAll(
    'input[name="radio-affichage"]'
);
radioAffichage.forEach((element) => {
    element.addEventListener("change", showData);
});

const screen = document.getElementById("screen");
async function getUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        const users = await response.json();
        return users; // ✅ ici aussi tu as ton tableau
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

function showAsGrid(data) {
    //Transformation des données à l´aide de map
    //map prendra chacun des user de data, le transformera et l´ajoutera au tableau users
    const users = data.map(
        (user) =>
            `
            <div class="col border border-2 bg-info-subtle p-2">
                <p class="fw-bold">${user.name}</p>
                <p>${user.phone}</p>
                <p>${user.email}</p>
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
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
            </tr>`
    );

    //Création du tableau pour acceuillir les données et les afficher
    let table = `
    <table class="table table-striped my-3">
        <thead>
            <tr>
                <th class="bg-secondary text-light">Nom</th>
                <th class="bg-secondary text-light">Télephone</th>
                <th class="bg-secondary text-light">Email</th>
            </tr>
        </thead>
        <tbody id="tbody-users">${users.join(" ")}</tbody>
    </table>`;

    screen.innerHTML = table;
}
