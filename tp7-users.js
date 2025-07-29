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

    if (selected.id == "tableau") {
        getUsers().then((users) => {
            showAsTable(users);
        });
    } else {
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
            <div class="col border-2">
                <p>${user.name}</p>
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

function printValue(e) {
    if (e.checked) {
        console.log(e.value);
    }
}

function handlResponse(response) {
    return response.json();
}

let tableLines = "";
const tBodyUsers = document.getElementById("tbody-users");

function showAsTable(data) {
    console.log(data);

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
    tBodyUsers.innerHTML = tableLines;
}

/*function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => handlResponse(response))
        .then((data) => handleData(data));
}*/
