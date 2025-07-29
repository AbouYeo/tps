function handlResponse(response) {
    return response.json();
}

let tableLines = "";
const tBodyUsers = document.getElementById("tbody-users");
function handleData(data) {
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

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => handlResponse(response))
        .then((data) => handleData(data));
}
