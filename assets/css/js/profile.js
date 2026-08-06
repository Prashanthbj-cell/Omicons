import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const firebaseConfig = {

apiKey: "AIzaSyCRD684PyMukUI1GS7loAFRCZ5mmDBJmDE",

authDomain: "omicons.firebaseapp.com",

projectId: "omicons",

storageBucket: "omicons.firebasestorage.app",

messagingSenderId: "720025359555",

appId: "1:720025359555:web:b9fdcd4c30e9bcffddbe76"

};



const app = initializeApp(firebaseConfig);


const auth = getAuth(app);





onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="login.html";

return;

}


document.getElementById("userName").innerText =
user.displayName || "OMICONS User";


document.getElementById("userEmail").innerText =
user.email;


document.getElementById("userUID").innerText =
user.uid;


const joined = new Date(user.metadata.creationTime);

document.getElementById("memberSince").innerText =
joined.toDateString();



if(user.photoURL){

document.getElementById("profileImage").src =
user.photoURL;

}


});




window.logout = async function(){

await signOut(auth);

window.location.href="login.html";

}




window.uploadImage = async function () {

    try {

        const file = document.getElementById("imageUpload").files[0];

        if (!file) {
            alert("Please select an image");
            return;
        }

        const user = auth.currentUser;

        if (!user) {
            alert("User not logged in");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "upload_preset",
            "omicons_profile"
        );

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/agkstsa9/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!data.secure_url) {
            console.log(data);

throw new Error(data.error?.message || "Image upload failed");
        }

        const imageURL = data.secure_url;

        await updateProfile(user, {
            photoURL: imageURL
        });

        document.getElementById("profileImage").src = imageURL;

        alert("Profile image updated successfully");

    }
    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
