if (
    window.location.pathname.includes("index.html") &&
    localStorage.getItem("loggedIn") !== "true"
) {
    window.location.href = "login.html";
}

let icons = [];


fetch("database/icons.json")

.then(response => response.json())

.then(data => {

    icons = data;

    console.log(data);

})
.catch(error => {

    console.log("Database loading error:", error);

});


function searchIcon(){

    let input = document
    .getElementById("search")
    .value
    .toLowerCase();


    let result = document.getElementById("result");

    result.innerHTML = "";


    icons.forEach(icon => {


        if(
icon.name.toLowerCase().includes(input) ||
icon.keyword.toLowerCase().includes(input) ||
icon.category.toLowerCase().includes(input)
){


            result.innerHTML += `

            <div class="card">

                <img src="${icon.image}" width="100">

                <h3>${icon.name}</h3>

                <p>${icon.category}</p>

                <button onclick="downloadIcon('${icon.image}','${icon.name}')">
                Download PNG
                </button>

            </div>

            `;

        }


    });


}

function downloadIcon(image, name) {

    let img = new Image();

    img.onload = function () {

        let canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

        let pngFile = canvas.toDataURL("image/png");


        let link = document.createElement("a");

        link.href = pngFile;

        link.download = name + ".png";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    };

    img.src = image;

}

function filterCategory(category) {

    let result = document.getElementById("result");

    result.innerHTML = "";


    let found = false;


    icons.forEach(icon => {

        if (icon.category.toLowerCase() === category.toLowerCase()) {

            found = true;

            result.innerHTML += `

            <div class="card">

                <img src="${icon.image}" width="100">

                <h3>${icon.name}</h3>

                <p>${icon.category}</p>

                <button onclick="downloadIcon('${icon.image}','${icon.name}')">
                    Download PNG
                </button>

            </div>

            `;

        }

    });


    if (!found) {

        result.innerHTML = "<h3>No icons found in this category</h3>";

    }


}

function login(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("omiconsUser"));

    if (!user) {
        alert("Please register first.");
        return;
    }

    if (email === user.email && password === user.password) {

        localStorage.setItem("loggedIn", "true");

        alert("Login Successful");

        window.location.href = "index.html";   // Main website

    } else {

        alert("Invalid Email or Password");

    }
}

function register(event){

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm){
        alert("Passwords do not match");
        return;
    }

    localStorage.setItem("omiconsUser", JSON.stringify({
        name: name,
        email: email,
        password: password
    }));

    alert("Registration Successful");

    window.location.href = "login.html";   // Go to login page
}

function logout() {

    localStorage.removeItem("loggedIn");

    alert("Logged out successfully.");

    window.location.href = "login.html";

}

window.onload = function () {

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // If this page doesn't have these buttons, do nothing
    if (!loginBtn || !registerBtn || !logoutBtn) {
        return;
    }

    if (localStorage.getItem("loggedIn") === "true") {

        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";

    } else {

        loginBtn.style.display = "inline-block";
        registerBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";

    }
};