function handlResponse(response) {
    return response.json();
}

function handleData(data) {
    console.log(data);

    let users = data;
    for (index = 0; index < users.length; index++) {
        let user = users[index];
        console.log(user);
    }
}

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => handlResponse(response))
        .then((data) => handleData(data));
}
