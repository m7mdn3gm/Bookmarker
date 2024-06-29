var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var alertName = document.getElementById('alertName');
var alertUrl = document.getElementById('alertUrl');
var productList = [];
if ( localStorage.getItem("products") != null ) {
    productList = JSON.parse(localStorage.getItem("products"));
    displayProduct();
}

// Add Products
function addProduct() {
    if ( siteNameInput.value == '' || siteUrlInput.value == '' ) {
        validProduct();
        validName();
        validUrl();
    }else {
        var object = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        }
        productList.push(object);
        localStorage.setItem("products" , JSON.stringify(productList));
        displayProduct();
        clear();
    }
}

// Display Products
function displayProduct() {
    temp = '';
    for (var i = 0 ; i < productList.length ; i++ ) {
        temp += `<tr>
                    <td>`+(i+1)+`</td>
                    <td>`+productList[i].name+`</td>
                    <td><a href="`+productList[i].url+`" target="_blank"><button class="btn btn-warning"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                    <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`
    }
    document.getElementById('myData').innerHTML = temp;
}

// Delete Product
function deleteProduct(index) {
    productList.splice(index , 1);
    localStorage.setItem("products" , JSON.stringify(productList));
    displayProduct();
}

// clear 
function clear() {
    siteNameInput.value = '';
    siteUrlInput.value = '';

    siteNameInput.classList.remove('is-valid');
    siteUrlInput.classList.remove('is-valid');
    siteNameInput.classList.remove('is-invalid');
    siteUrlInput.classList.remove('is-invalid');
}

// valid
function validProduct() {
    if(siteNameInput.value == '' || siteUrlInput.value == '') {
        var temp =  `     <div class="valid translate-middle">
        <div class="main d-flex justify-content-between mb-3">
            <div class="color d-flex gap-2">
                <div class="red"></div>
                <div class="orange"></div>
                <div class="green"></div>
            </div>
            <div class="close">
                <i class="fa-brands fa-xing"></i>
            </div>
        </div>
        <div class="body">
            <p>Site Name or Url is not valid, Please follow the rules below :</p>
            <p><i class="fa-regular fa-circle-right"></i>Site name must contain at least 3 characters</p>
            <p><i class="fa-regular fa-circle-right"></i>Site URL must be a valid one</p>
        </div>  
     </div>`
    }
    document.getElementById("bodyProduct").innerHTML = temp;
    document.querySelector(".close").addEventListener('click', ()=>{
        document.getElementById("bodyProduct").innerHTML = '';
    });
}

// valid Name
siteNameInput.addEventListener('change' , validName);
function validName(){
    var regexname = /^[a-zA-Z]{3,}$/;
    if(regexname.test(siteNameInput.value)){
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        alertName.classList.add("d-none");
        return true;
    }else {
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        alertName.classList.remove("d-none");
        return false;
    }
}

// valid Url
siteUrlInput.addEventListener('change' , validUrl);
function validUrl(){
    var regexurl = /^(https|http):\/\/[a-zA-Z0-9]/;
    if(regexurl.test(siteUrlInput.value)){
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        alertUrl.classList.add("d-none");
        return true;
    }else {
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        alertUrl.classList.remove("d-none");
        return false;
    }
}