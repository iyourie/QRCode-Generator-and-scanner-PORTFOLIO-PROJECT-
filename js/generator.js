//vars
let nav = document.querySelectorAll("nav div"),
    sectionDivs = document.querySelectorAll("section div"),
    intro = document.querySelector(".intro"),
    aside = document.querySelector("aside"),
    footer = document.querySelector("footer"),
    generateQRCode = document.querySelector('#qr-code-creator').querySelector('.create'),
    dbReady = false,
    file,
    db,
    color,
    range,
    format = 'png';
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input"),
    eye = document.querySelectorAll(".eyes");



//this code is responsible for tracking the value of input:range 
function track(x) {
    document.querySelector('#qr-code-creator').querySelector('p').textContent = `${x}x${x}`
    range = `${x}x${x}`;
}
//this code is responsible for tracking the value of input:color
function colour(x) {
    let arr = x.split('')
    arr.shift()
    color = arr.join('')
}


// this is the main code and it is responsible for creating the qrcode with the data given by the user
nav.forEach((x) => {
    x.onclick = () => {
        nav.forEach((c) => {
            c.classList.remove("active"); //active is a class used to give the element blue color
            document.getElementsByClassName(c.id)[0].classList.remove("yes");
        });
        sectionDivs.forEach((x) => {
            if (x.hasAttribute("id")) {
                x.style.display = "none";
            }
        });
        x.classList.add("active");
        document.getElementsByClassName(x.id)[0].style.display = "flex";
        document.getElementsByClassName(x.id)[0].classList.add("yes");
        intro.style.display = "none";
        document.querySelector(".yes").lastChild.previousSibling.addEventListener("click", () => {
            if (document.querySelector(".yes").classList.contains("url")) {
                if (document.querySelector(".yes").querySelector("textarea").value) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`http://api.qrserver.com/v1/create-qr-code/?data=${document.querySelector(".yes").querySelector("textarea").value}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else {
                    alert("type something");
                }
            } else if (document.querySelector(".yes").classList.contains("image")) {
                if (document.querySelector(".yes").querySelector(".drag-area").classList.contains("no")) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`http://api.qrserver.com/v1/create-qr-code/?data=http://127.0.0.1:5500/yourImg.html&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else {
                    alert("insert an image");
                }
            } else if (document.querySelector(".yes").classList.contains("text")) {
                if (document.querySelector(".yes").querySelector("textarea").value) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`https://api.qrserver.com/v1/create-qr-code/?data=${document.querySelector(".yes").querySelector("textarea").value}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else {
                    alert("type something");
                }
            } else if (document.querySelector(".yes").classList.contains("location")) {
                if (
                    document.querySelector(".yes").querySelectorAll("input")[0].value &&
                    document.querySelector(".yes").querySelectorAll("input")[1].value &&
                    document.querySelector(".yes").querySelectorAll("input")[2].value
                ) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`https://api.qrserver.com/v1/create-qr-code/?data=${`Lat: ${document.querySelector(".yes").querySelectorAll("input")[0].value} || Long: ${document.querySelector(".yes").querySelectorAll("input")[1].value} || Ip: ${document.querySelector(".yes").querySelectorAll("input")[2].value}`}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else if (
                    document.querySelector(".yes").querySelectorAll("input")[0].value &&
                    document.querySelector(".yes").querySelectorAll("input")[1].value &&
                    !document.querySelector(".yes").querySelectorAll("input")[2].value
                ) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`https://api.qrserver.com/v1/create-qr-code/?data=${`Lat: ${document.querySelector(".yes").querySelectorAll("input")[0].value} || Long: ${document.querySelector(".yes").querySelectorAll("input")[1].value}`}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else if (
                    document.querySelector(".yes").querySelectorAll("input")[2].value &&
                    !document.querySelector(".yes").querySelectorAll("input")[0]
                        .value &&
                    !document.querySelector(".yes").querySelectorAll("input")[1].value
                ) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`https://api.qrserver.com/v1/create-qr-code/?data=${`Ip: ${document.querySelector(".yes").querySelectorAll("input")[2].value} `}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else {
                    alert("enter either lat and long or ip adresse");
                }
            } else if (document.querySelector(".yes").classList.contains("email")) {
                if (document.querySelector(".yes").querySelectorAll("textarea")[0].value && document.querySelector(".yes").querySelectorAll("textarea")[1].value && document.querySelector(".yes").querySelectorAll("textarea")[2].value
                ) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`https://api.qrserver.com/v1/create-qr-code/?data=${`Email: ${document.querySelector(".yes").querySelectorAll("textarea")[0].value} || Object: ${document.querySelector(".yes").querySelectorAll("textarea")[1].value} || Message: ${document.querySelector(".yes").querySelectorAll("textarea")[2].value}`}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else {
                    alert("fill all the blanks");
                }
            } else if (document.querySelector(".yes").classList.contains("wifi")) {
                if (
                    document.querySelector(".yes").querySelectorAll("textarea")[0]
                        .value &&
                    document.querySelector(".yes").querySelectorAll("textarea")[1]
                        .value &&
                    document.querySelector(".yes").querySelector("input").value
                ) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`https://api.qrserver.com/v1/create-qr-code/?data=${`Wifi Name: ${document.querySelector(".yes").querySelector("textarea").value} || Security Type: ${document.querySelector(".yes").querySelectorAll("textarea")[1].value} || Wifi Password: ${document.querySelector(".yes").querySelector("input").value}`}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else {
                    alert("fill all the blanks");
                }
            } else if (document.querySelector(".yes").classList.contains("number")) {
                if (document.querySelector(".yes").querySelector("input").value) {
                    aside.classList.add("overlay");
                    footer.style.display = "flex";
                    document.querySelector('#qr-code-creator').style.display = 'flex'
                    generateQRCode.onclick = () => {
                        let img = `<img src="${`https://api.qrserver.com/v1/create-qr-code/?data=${document.querySelector(".yes").querySelector("input").value}&size=${range}x${range}&color=${color}&format=${format}&margin=10`}"/>`;
                        footer.querySelector('#qrcode').innerHTML = img
                        document.querySelector('#qr-code-creator').style.display = 'none';
                        document.querySelector('#qr-code-generator').style.display = 'flex'
                    }
                } else {
                    alert("enter a number");
                }
            }
        });
    };
});



//this code is respnsible for letting the user inserting his image weather by browse it or drag it
button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
};
input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("change");
    showFile(); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("change");
    dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});
function showFile() {
    dropArea.classList.remove("change");
    dropArea.classList.add("no");
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) {
        //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
            let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        };
    } else {
        dropArea.classList.remove("change");
    }
}


//this code is responsible for storing the user's image in database;
//indexed db
//check if the user's browser support indexed db
const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;
//if it's not:
if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("dom content loaded");

    document
        .querySelector('input[type="file"]')
        .addEventListener("change", doFile);

    initDb();
});

function initDb() {
    //open indexeddb database or create new one
    let request = indexedDB.open("testPics", 1);
    //if an error happend:
    request.onerror = function (e) {
        console.error("Unable to open database.");
    };
    // if request succes :
    request.onsuccess = function (e) {
        db = e.target.result;
        console.log("db opened");
    };
    //if data base is upgraded
    request.onupgradeneeded = function (e) {
        let db = e.target.result;
        db.createObjectStore("cachedForms", { keyPath: "id", autoIncrement: true });
        dbReady = true;
    };
}
let addReq;
function doFile(e) {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array

    if (validExtensions.includes(fileType)) {
        //if user selected file is an image file
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            let bits = e.target.result;
            let ob = {
                created: new Date(),
                data: bits,
            };
            let trans = db.transaction(["cachedForms"], "readwrite");
            addReq = trans.objectStore("cachedForms").add(ob);
        };
    } else {
        alert("This is not an Image File!");
    }

    trans.oncomplete = function (e) {
        console.log("data stored");
    };
}


//this code is responsible for getting user's latitude and longitude
document.querySelector(".lat-long").onclick = () => {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        document.querySelector(".location").querySelectorAll("input")[0].value =
            position.coords.latitude;
        document.querySelector(".location").querySelectorAll("input")[1].value =
            position.coords.longitude;
    }
    getLocation();
};

//this code is responsible for getting user's ip adresse
document.querySelector(".ip-btn").onclick = () => {
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        document.querySelector("#ip").value = data.ip;
    });
};

//this code is responsible for toggling the visibility of input's text  (wifi)
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
togglePassword.addEventListener("click", function () {
    const type =
        password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye");
});


//this code is responsible for downloading QRCode
document.querySelector(".download").onclick = () => {
    let a = document.querySelector("#qrcode").querySelector("img").src;
    saveAs(a, `Skull QRCode.${format}`);
    footer.style.display = 'none'
    aside.classList.remove("overlay");
    document.querySelector('#qr-code-generator').style.display = 'none'
};

//this code is responsible for choosing the format of the qrcode to dowload
document.querySelector('.formats').querySelectorAll('button').forEach(x => {
    x.onclick = () => {
        document.querySelector('.formats').querySelectorAll('button').forEach(x => {
            x.classList.remove('format')
        })
        x.classList.toggle('format')
        format = x.textContent
    }
})



