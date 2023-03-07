"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Person {
    constructor(name, email, mobile, landline, website, address) {
        this.name = name;
        this.email = email;
        this.phone = mobile;
        this.landline = landline;
        this.website = website;
        this.addressDetails = address;
    }
}
let addressDetails = document.getElementById('ViewDetails');
let addresslist = document.getElementById('ContactListItems');
let inputForm = document.getElementById('InputForm');
let addButton = document.getElementById('SubmitButton');
let saveButton = document.getElementById('EditButton');
let entryName = document.getElementById('NameEntry');
let entryEmail = document.getElementById('EmailEntry');
let entryMobile = document.getElementById('MobileEntry');
let entryLandline = document.getElementById('LandlineEntry');
let entryWebsite = document.getElementById('WebsiteEntry');
let entryAddress = document.getElementById('AddressEntry');
let requiredName = document.getElementById('RequiredName');
let requiredEmail = document.getElementById('RequiredEmail');
let requiredMobile = document.getElementById('RequiredMobile');
let requiredLandline = document.getElementById('RequiredLandline');
let requiredSite = document.getElementById('RequiredSite');
let requiredAddress = document.getElementById('RequiredAddress');
let selectedContact, selectedContactDetails;
let validName = false, validEmail = false, validMobile = false, validLandline = false, validSite = false, validAddress = false;
let contactBook = []; //empty array to store all the objects
//const person1 = new Person('Chandermani Arora','Chandermani@technovert.com',9192929292922,2334567890,'www.technovert.com','abc streat, some road, madhapur, hyderabad-500033');
//const person2 = new Person('Sash Pagadala','Chandermani@technovert.com',9192923452922,233456789,'www.keka.com','abc streat, some road, rajpur, hyderabad-500133');
//contactBook = [person1,person2];
//creating contact list
function extructDatabase() {
    //console.log("edited")
    fetch("https://localhost:44309/api/Address/GetAllAddress").then((Data) => {
        return Data.json();
    }).then((objectData) => {
        let addressData = "";
        objectData.map((values) => {
            //console.log(values)
            addressData += `<div class="contact-list-item" id=${values.id} onclick="selectDetails(this)">
                <p class="contact-name">${values.name}</p>
                <p class="contact-email">${values.email}</p>
                <p class="contact-mobile">+91 ${values.phone}</p>
            </div>`;
        });
        document.getElementById("ContactListItems").innerHTML = addressData;
    });
}
function selectDetails(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var personID = e.id;
        //var selectedDiv = (document.getElementById(personID) as HTMLDivElement)
        //var x = (document.getElementById("contact-id") as HTMLParagraphElement).innerHTML;
        yield fetch("https://localhost:44309/api/Address/GetAddress/" + personID).then((Data) => {
            return Data.json();
        }).then((values) => {
            let _personIdHidden = document.getElementById('PersonIDHidden');
            _personIdHidden.innerText = personID;
            showDetails(values);
            inputForm.style.display = 'none';
            let allAddress = addresslist.children;
            let addressItem = document.getElementById(personID);
            selectedContact = addressItem;
            for (let i = 0; i < allAddress.length; i++) {
                allAddress[i].style.backgroundColor = 'white';
                allAddress[i].style.overflowX = 'hidden';
            }
            addressItem.style.backgroundColor = '#CEE7F2';
            makeScroll(addressItem);
            addressDetails.style.display = 'block';
            //addressDetails.class=personID;
            /*
            document.querySelector('.icon-edit')?.addEventListener('click',function(){
                validName=validEmail=validMobile=validLandline=validSite=validAddress=false;
                addressDetails.style.display= 'none';
                inputForm.style.display = 'block';
                addButton.style.display = 'None';
                saveButton.style.display = 'block';
                entryName.value = values.name;
                entryEmail.value = values.email;
                entryMobile.value = String(values.phone);
                entryLandline.value = String(values.landline);
                entryWebsite.value = values.website;
                entryAddress.value = values.addressDetails;

            });
            */
        });
    });
}
function getEditWindow() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        var personID = (_a = document.getElementById('PersonIDHidden')) === null || _a === void 0 ? void 0 : _a.innerText;
        yield fetch("https://localhost:44309/api/Address/GetAddress/" + personID).then((Data) => {
            return Data.json();
        }).then((values) => {
            validName = validEmail = validMobile = validLandline = validSite = validAddress = false;
            addressDetails.style.display = 'none';
            inputForm.style.display = 'block';
            addButton.style.display = 'None';
            saveButton.style.display = 'block';
            entryName.value = values.name;
            entryEmail.value = values.email;
            entryMobile.value = String(values.phone);
            entryLandline.value = String(values.landline);
            entryWebsite.value = values.website;
            entryAddress.value = values.addressDetails;
        });
    });
}
function addDetails() {
    let allAddress = addresslist.children;
    for (let i = 0; i < allAddress.length; i++) {
        allAddress[i].style.backgroundColor = 'white';
        allAddress[i].style.overflowX = 'hidden';
    }
    addressDetails.style.display = 'none';
    addButton.style.display = 'block';
    saveButton.style.display = 'none';
    inputForm.style.display = 'block';
}
function saveDetails(e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validName && validEmail && validMobile && validLandline && validSite && validAddress) {
            let enteredName = entryName.value;
            let enteredEmail = entryEmail.value;
            let enterdedMobile = Number(entryMobile.value);
            let enteredLandline = Number((entryLandline).value);
            let enteredWebsite = entryWebsite.value;
            let enteredAddress = entryAddress.value;
            //const obj = new Person(enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress)
            //const obj1 = new FormData(inputForm as HTMLFormElement)
            yield fetch("https://localhost:44309/api/Address/AddAddress", {
                method: "POST",
                body: JSON.stringify({
                    name: enteredName,
                    email: enteredEmail,
                    phone: enterdedMobile,
                    landline: enteredLandline,
                    website: enteredWebsite,
                    addressDetails: enteredAddress,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(res => res.json)
                .then(data => console.log(data));
            document.getElementById('Formid').reset();
            inputForm.style.display = 'none';
            //extructDatabase();
            document.location.reload();
            //selectDetails(e);
        }
        else {
            alert('Please fill the form properly');
        }
        //document.location.reload();
        extructDatabase();
    });
}
function editDetails(e) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        formValidate();
        if (validName && validEmail && validMobile && validLandline && validSite && validAddress) {
            let enteredName = entryName.value;
            let enteredEmail = entryEmail.value;
            let enterdedMobile = Number(entryMobile.value);
            let enteredLandline = Number((entryLandline).value);
            let enteredWebsite = entryWebsite.value;
            let enteredAddress = entryAddress.value;
            yield fetch("https://localhost:44309/api/Address/UpdateAddress", {
                method: "PUT",
                body: JSON.stringify({
                    id: (_a = document.getElementById('PersonIDHidden')) === null || _a === void 0 ? void 0 : _a.innerText,
                    name: enteredName,
                    email: enteredEmail,
                    phone: enterdedMobile,
                    landline: enteredLandline,
                    website: enteredWebsite,
                    addressDetails: enteredAddress,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            document.getElementById('Formid').reset();
            inputForm.style.display = 'none';
            var personID = (_b = document.getElementById('PersonIDHidden')) === null || _b === void 0 ? void 0 : _b.innerText;
            /*
            let allAddress : any = addresslist.children;
            let addressItem = document.getElementById(String(personID1)) as HTMLDivElement;
            selectedContact = addressItem;
            for(let i=0;i<allAddress.length;i++)
            {
                allAddress[i].style.backgroundColor = 'white';
                allAddress[i].style.overflowX = 'hidden';
            }
            addressItem.style.backgroundColor = '#CEE7F2';
            makeScroll(addressItem);
            */
            //selectDetails(e);
            //document.location.reload();
            /*copied code*/
            fetchDetails(personID);
        }
        else {
            alert('Please fill the form properly');
        }
        extructDatabase();
    });
}
function deleteContact() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        var pid = (_a = document.getElementById('PersonIDHidden')) === null || _a === void 0 ? void 0 : _a.innerText;
        yield fetch("https://localhost:44309/api/Address/DeleteAddress/" + pid, { method: 'DELETE' });
        //document.location.reload(); 
        extructDatabase();
        addressDetails.style.display = 'none';
    });
}
function fetchDetails(personID1) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch("https://localhost:44309/api/Address/GetAddress/" + personID1).then((Data) => {
            return Data.json();
        }).then((values) => {
            let _personIdHidden = document.getElementById('PersonIDHidden');
            _personIdHidden.innerText = personID1;
            showDetails(values);
            addressDetails.style.display = 'block';
            let allAddress = addresslist.children;
            let addressItem = document.getElementById(String(personID1));
            selectedContact = addressItem;
            for (let i = 0; i < allAddress.length; i++) {
                allAddress[i].style.backgroundColor = 'white';
                allAddress[i].style.overflowX = 'hidden';
            }
            addressItem.style.backgroundColor = '#CEE7F2';
            makeScroll(addressItem);
        });
    });
}
/* form validation */
function nameValidate() {
    validName = false;
    let tempName = entryName.value;
    if (tempName.length == 0) {
        requiredName.innerHTML = 'Name is required';
    }
    else if (tempName.length > 0) {
        requiredName.innerHTML = '';
        validName = true;
    }
}
function validateEmail() {
    validEmail = false;
    let tempEmail = entryEmail.value;
    if (tempEmail.length === 0) {
        requiredEmail.innerHTML = 'Email is required';
    }
    else if (tempEmail.length > 0) {
        let valideMail = /^[0-9a-z.\s+_]+@[0-9a-z-.+]+\.[a-z]{2,4}$/;
        if (tempEmail.match(valideMail)) {
            requiredEmail.innerHTML = '';
            validEmail = true;
        }
        else {
            requiredEmail.innerHTML = 'Email is incorrect';
        }
    }
}
function validateMobile() {
    validMobile = false;
    let tempMobile = entryMobile.value;
    if (tempMobile.length == 0) {
        requiredMobile.innerHTML = 'Mobile is required';
    }
    else if (tempMobile.length != 10 || (Number(tempMobile) % 1) != 0) {
        requiredMobile.innerHTML = 'Mobile is incorrect';
    }
    else {
        requiredMobile.innerHTML = '';
        validMobile = true;
    }
}
function validateLandline() {
    validLandline = false;
    let tempLandline = entryLandline.value;
    if (tempLandline.length == 0) {
        requiredLandline.innerHTML = 'Landline is required';
    }
    else if (tempLandline.length != 10 || (Number(tempLandline) % 1) != 0) {
        requiredLandline.innerHTML = 'Landline is incorrect';
    }
    else {
        requiredLandline.innerHTML = '';
        validLandline = true;
    }
}
function validateWebsite() {
    validSite = false;
    let tempSite = entryWebsite.value;
    if (tempSite.length == 0) {
        requiredSite.innerHTML = 'Website is required';
    }
    else if (tempSite.length > 0) {
        requiredSite.innerHTML = '';
        validSite = true;
    }
}
function validateAddress() {
    validAddress = false;
    let tempAddress = entryAddress.value;
    if (tempAddress.length == 0) {
        requiredAddress.innerHTML = 'Address is required';
    }
    else if (tempAddress.length > 0) {
        requiredAddress.innerHTML = '';
        validAddress = true;
    }
}
function formValidate() {
    nameValidate();
    validateEmail();
    validateMobile();
    validateLandline();
    validateWebsite();
    validateAddress();
}
function showDetails(obj) {
    let _name = document.getElementById('PersonName');
    _name.innerText = obj.name;
    let _email = document.getElementById('DetailEmail');
    _email.innerText = "Email: " + obj.email;
    let _mobile = document.getElementById('DetailMobile');
    _mobile.innerText = "Mobile: " + '+91 ' + obj.phone;
    let _landline = document.getElementById('DetailLandline');
    _landline.innerText = "Landline: " + obj.landline;
    let _website = document.getElementById('DetailSite');
    _website.innerText = "Website: " + 'https://' + obj.website;
    let _address = document.getElementById('DetailAddress');
    _address.innerText = "Address: " + obj.addressDetails;
}
function goToHome() {
    let allAddress = addresslist.children;
    for (let i = 0; i < allAddress.length; i++) {
        allAddress[i].style.backgroundColor = 'white';
        allAddress[i].style.overflowX = 'hidden';
    }
    addressDetails.style.display = 'none';
    inputForm.style.display = 'none';
}
/* Extra functions added lastly after the feedback */
function makeScroll(element) {
    if (overflow(element)) {
        selectedContact.style.overflowX = "scroll";
    }
}
function overflow(tempElement) {
    return tempElement.scrollHeight > tempElement.clientHeight || tempElement.scrollWidth > tempElement.clientWidth;
}
