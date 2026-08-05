
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


function searchIcon() {

    const searchBox = document.getElementById("search");
    const result = document.getElementById("result");

    const input = searchBox.value.trim().toLowerCase();

    result.innerHTML = "";

    // Empty search
    if (input === "") {

        searchBox.placeholder = "Please enter an icon name to search";
        searchBox.focus();

        return;

    }

    // Restore placeholder
    searchBox.placeholder = "Search scientific icons...";

    icons.forEach(icon => {

        if (
            icon.name.toLowerCase().includes(input) ||
            icon.keyword.toLowerCase().includes(input) ||
            icon.category.toLowerCase().includes(input)
        ) {

            result.innerHTML += `

<div class="card">

    <img src="${icon.image}"
         onclick="openImage('${icon.image}','${icon.name}')">

    <h3>${icon.name}</h3>

    <div class="button-row">

        <button class="download-btn"
                onclick="downloadIcon('${icon.image}','${icon.name}')">
            Download PNG
        </button>

        <span class="heart-btn"
              onclick="addFavorite('${icon.name}','${icon.image}','icons.html')">
            ❤️
        </span>

    </div>

</div>

            `;

        }

    });

    if (result.innerHTML === "") {

        result.innerHTML = "<h3>No icons found.</h3>";

    }

}

function downloadIcon(image, name) {

    let img = new Image();

    img.onload = function () {

        let canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");

        // Draw the icon
        ctx.drawImage(img, 0, 0);

        // ===== WATERMARK =====
        ctx.save();
ctx.rotate(-Math.PI / 4);

ctx.font = "60px Arial";
ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
ctx.textAlign = "center";

for (let x = -canvas.width; x < canvas.width * 2; x += 300) {
    for (let y = -canvas.height; y < canvas.height * 2; y += 200) {
        ctx.fillText("OMICONS", x, y);
    }
}

ctx.restore();
        // =====================

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

function openImage(image, name){

    const modal = document.getElementById("imageModal");

    modal.style.display = "flex";

    document.getElementById("modalImage").src = image;
    document.getElementById("modalTitle").innerText = name;

}

function closeImage(){

    document.getElementById("imageModal").style.display = "none";

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

    <img src="${icon.image}"
         class="icon-small"
         onclick="openImage('${icon.image}','${icon.name}')">

    <h3>${icon.name}</h3>

    <p>${icon.category}</p>

    <div class="button-row">

<button class="download-btn" onclick="downloadIcon('${icon.image}','${icon.name}')">
    Download PNG
</button>


<span class="heart-btn"
onclick="addFavorite('${icon.name}','${icon.image}','icons.html')">
❤️
</span>

</div>

</div>

            `;

        }

    });


    if (!found) {

    result.innerHTML = "<h3>No icons found in this category</h3>";

}

// Scroll back to the Icons section
document.getElementById("icons").scrollIntoView({
    behavior: "smooth"
});

}



function addFavorite(name,image,link){


let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];


let exists =
favorites.some(icon=>icon.name===name);


if(!exists){

favorites.push({
name:name,
image:image,
link:link
});


localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);


alert("Added to Favorites ❤️");

}

else{

alert("Already in Favorites");

}


}
