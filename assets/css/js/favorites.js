let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let container = document.getElementById("favoriteContainer");


function displayFavorites(){

    container.innerHTML = "";


    if(favorites.length === 0){

        container.innerHTML = "<h3>No favorite icons saved ❤️</h3>";

        return;

    }


   favorites.forEach((icon,index)=>{

    container.innerHTML += `

    <div class="icon-card">

        <img src="${icon.image}"
        onclick="openImage('${icon.image}','${icon.name}')">


        <h3>${icon.name}</h3>


    <div class="card-buttons">

    <button class="download-btn"
    onclick="downloadIcon('${icon.image}','${icon.name}')">
    ⬇ Download PNG
    </button>


    <span class="heart-btn"
    onclick="removeFavorite(${index})">
    ❤️
    </span>

</div>

    `;

});


}

function downloadIcon(image, name) {

    let img = new Image();

    img.onload = function () {

        let canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");

        ctx.drawImage(img,0,0);


        let link = document.createElement("a");

        link.href = canvas.toDataURL("image/png");

        link.download = name + ".png";

        link.click();

    };


    img.src = image;

}


function removeFavorite(index){

    favorites.splice(index,1);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    displayFavorites();

}



function openImage(image,name){

    document.getElementById("imageModal").style.display = "block";

    document.getElementById("modalImage").src = image;

    document.getElementById("modalTitle").innerText = name;

}

function closeImage(){

    document.getElementById("imageModal").style.display = "none";

}

displayFavorites();
