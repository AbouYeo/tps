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
        console.log("Valeur sélectionnée : grille");
    }
}

function showAsGrid(users) {
    let gridcells = ``;
    let cell;
    users.forEach((user) => {
        cell = `
            <div class="col border border-2 bg-info-subtle p-2">
                <p class="fw-bold">${user.name}</p>
                <p>${user.phone}</p>
                <p>${user.email}</p>
            </div>
            `;
        gridcells += cell;
    });
    screen.innerHTML = `
        <div class="container text-center">
            <div class="row row-cols-2">${gridcells}</div>
        </div>`;

    console.log("Hello from affichage");
}

function showAsTable(data) {
    let tableLines = "";
    // const tBodyUsers = document.getElementById("tbody-users");

    let users = data;
    for (index = 0; index < users.length; index++) {
        let user = users[index];
        let line = `<tr>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                    </tr>`;
        tableLines += line;
    }

    let table = `
    <table class="table table-striped my-3">
        <thead>
            <tr>
                <th class="bg-secondary text-light">Nom</th>
                <th class="bg-secondary text-light">Télephone</th>
                <th class="bg-secondary text-light">Email</th>
            </tr>
        </thead>
        <tbody id="tbody-users">${tableLines}</tbody>
    </table>`;

    screen.innerHTML = table;

    console.log(data);
}

/*function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => handlResponse(response))
        .then((data) => handleData(data));
}*/
