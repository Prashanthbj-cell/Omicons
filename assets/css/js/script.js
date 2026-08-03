
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

<img src="${icon.image}" 
onclick="openImage('${icon.image}','${icon.name}')">

<h3>${icon.name}</h3>

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

function openImage(image, name){

    document.getElementById("imageModal").style.display = "block";
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
