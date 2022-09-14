//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input"),
    load = document.querySelector('.ocrloader'),
    h1 = document.querySelector('h1')


let file;
dropArea.onclick = () => {
    input.click();
};

input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function

    let formData = new FormData()
    formData.append('file', file)
    request(file, formData)
    load.style.display = 'inline-block'

    document.querySelectorAll('a')[1].href = '';
    document.querySelectorAll('a')[1].innerHTML = '';
    h1.innerHTML = '';

    h1.classList.remove('red')

});





//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Drop It Here";
});




//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});




//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function

    let formData = new FormData()
    formData.append('file', file)
    request(file, formData)
    load.style.display = 'inline-block'

    document.querySelectorAll('a')[1].href = '';
    document.querySelectorAll('a')[1].innerHTML = '';
    h1.innerHTML = '';

    h1.classList.remove('red')
});



function showFile() {
    dropArea.classList.remove("active");
    dropArea.classList.add("no");
    //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        let fileURL = fileReader.result; //passing user file source in fileURL variable
        // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
        let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
        dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    };
}


//this code is the most important LOL
function request(file, formData) {
    fetch('http://api.qrserver.com/v1/read-qr-code/', {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        if (result[0].symbol[0].data !== null) {
            if (result[0].symbol[0].data.startsWith('http')) {
                document.querySelectorAll('a')[1].href = result[0].symbol[0].data
                document.querySelectorAll('a')[1].innerHTML = result[0].symbol[0].data
                h1.innerHTML = result[0].symbol[0].data
                load.style.display = 'none'
            } else {
                load.style.display = 'none'
                h1.innerHTML = result[0].symbol[0].data
            }
        } else {
            h1.innerHTML = result[0].symbol[0].error
            load.style.display = 'none'
            h1.classList.add('red')
        }

    })
}


