document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const resultBox = document.getElementById("loginResult");
    const usersList = document.getElementById("userList");
    const injections = document.querySelectorAll(".injection-item");

    // Wysyłanie formularza za pomocą żądania AJAX
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(loginForm);

        fetch("php/login_handler.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(data => {
            resultBox.classList.remove("success", "error");

            if (data.includes("Zalogowano")) {
                resultBox.classList.add("success");
            } else {
                resultBox.classList.add("error");
            }

            resultBox.innerHTML = data;
            updateUserList();
        })
        .catch(err => {
            resultBox.innerHTML = `<div style="color: red;">Błąd: ${err}</div>`;
        });
    });

    // Wstaw iniekcję SQL po kliknięciu
    injections.forEach(item => {
        item.addEventListener("click", () => {
            const input = item.getAttribute("data-inject");
            const field = item.getAttribute("data-field");

            if (field === "username") {
                document.querySelector("input[name='username']").value = input;
            } else if (field === "password") {
                document.querySelector("input[name='password']").value = input;
            }

            // Pokażemy wyjaśnienie
            const infoBox = document.getElementById("injectionInfo");
            infoBox.innerHTML = `<div class="info-box">${item.getAttribute("data-info")}</div>`;

        });
    });

    // Aktualizowanie listy użytkowników
    function updateUserList() {
        fetch("php/fetch_users.php")
            .then(res => res.json())
            .then(data => {
                usersList.innerHTML = "";
                data.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${user.username}</td><td>${user.password}</td>`;
                    usersList.appendChild(row);
                });
            });
    }

    // Zainicjuj listę podczas ładowania
    updateUserList();
});

