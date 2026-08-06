import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import { 
getAuth,
onAuthStateChanged,
signOut,
updateProfile
} 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
getStorage,
ref,
uploadBytes,
getDownloadURL
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";



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

const storage = getStorage(app);




onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="login.html";

return;

}



document.getElementById("userName").innerText =
user.displayName || "OMICONS User";


document.getElementById("userEmail").innerText =
user.email;



if(user.photoURL){

document.getElementById("profileImage").src =
user.photoURL;

}


});




window.logout = async function(){

await signOut(auth);

window.location.href="login.html";

}




window.uploadImage = async function(){

try{

const file =
document.getElementById("imageUpload").files[0];


if(!file){

alert("Please select an image");

return;

}


const user = auth.currentUser;


if(!user){

alert("User not logged in");

return;

}



const imageRef =
ref(storage,"profileImages/"+user.uid);



await uploadBytes(imageRef,file);



const imageURL =
await getDownloadURL(imageRef);



await updateProfile(user,{
photoURL:imageURL
});



document.getElementById("profileImage").src=imageURL;


alert("Profile image updated successfully");


}

catch(error){

console.log(error);

alert(error.message);

}

}
