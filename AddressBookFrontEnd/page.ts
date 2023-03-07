class Person{
    name:string;
    email:string;
    phone:number;
    landline:number;
    website: string;
    addressDetails: string;
    constructor(name:string,email:string,mobile:number,landline:number,website:string,address:string){
        this.name = name;
        this.email = email;
        this.phone = mobile;
        this.landline = landline;
        this.website = website;
        this.addressDetails = address;   
    }
}

let addressDetails : any = document.getElementById('ViewDetails');
let addresslist : any = document.getElementById('ContactListItems');
let inputForm : any = document.getElementById('InputForm');
let addButton: any = document.getElementById('SubmitButton');
let saveButton: any = document.getElementById('EditButton');
let entryName = (document.getElementById('NameEntry') as HTMLInputElement);
let entryEmail = (document.getElementById('EmailEntry') as HTMLInputElement);
let entryMobile = (document.getElementById('MobileEntry') as HTMLInputElement);
let entryLandline = (document.getElementById('LandlineEntry') as HTMLInputElement);
let entryWebsite = (document.getElementById('WebsiteEntry') as HTMLInputElement);
let entryAddress = (document.getElementById('AddressEntry') as HTMLInputElement);
let requiredName = (document.getElementById('RequiredName') as HTMLDivElement);
let requiredEmail = (document.getElementById('RequiredEmail') as HTMLDivElement);
let requiredMobile = (document.getElementById('RequiredMobile') as HTMLDivElement);
let requiredLandline = (document.getElementById('RequiredLandline') as HTMLDivElement);
let requiredSite = (document.getElementById('RequiredSite') as HTMLDivElement);
let requiredAddress = (document.getElementById('RequiredAddress') as HTMLDivElement);

let selectedContact:any,selectedContactDetails:any;
let validName:boolean=false,validEmail:boolean=false,validMobile:boolean=false,validLandline:boolean=false,validSite:boolean=false,validAddress:boolean=false;
let contactBook : Person[] = []; //empty array to store all the objects
//const person1 = new Person('Chandermani Arora','Chandermani@technovert.com',9192929292922,2334567890,'www.technovert.com','abc streat, some road, madhapur, hyderabad-500033');
//const person2 = new Person('Sash Pagadala','Chandermani@technovert.com',9192923452922,233456789,'www.keka.com','abc streat, some road, rajpur, hyderabad-500133');
//contactBook = [person1,person2];

//creating contact list
function extructDatabase(){
    //console.log("edited")
    fetch("https://localhost:44309/api/Address/GetAllAddress").then((Data)=>{
        return Data.json();
        }).then((objectData)=>{
            let addressData = "";
            objectData.map((values:any)=>{
                //console.log(values)
                addressData +=`<div class="contact-list-item" id=${values.id} onclick="selectDetails(this)">
                <p class="contact-name">${values.name}</p>
                <p class="contact-email">${values.email}</p>
                <p class="contact-mobile">+91 ${values.phone}</p>
            </div>`;
            });
            (document.getElementById("ContactListItems") as HTMLDivElement).innerHTML = addressData;
                   
    });
}


async function selectDetails(e:any){
    var personID = e.id;
    //var selectedDiv = (document.getElementById(personID) as HTMLDivElement)
    
    //var x = (document.getElementById("contact-id") as HTMLParagraphElement).innerHTML;
    await fetch("https://localhost:44309/api/Address/GetAddress/"+personID).then((Data)=>{
        return Data.json();   
    }).then((values)=>{
            let _personIdHidden : any = document.getElementById('PersonIDHidden');
            _personIdHidden.innerText = personID;

            showDetails(values);
            inputForm.style.display = 'none';
            let allAddress : any = addresslist.children;
            let addressItem = document.getElementById(personID) as HTMLDivElement;
            selectedContact = addressItem;
            for(let i=0;i<allAddress.length;i++)
            {
                allAddress[i].style.backgroundColor = 'white';
                allAddress[i].style.overflowX = 'hidden';
            }
            addressItem.style.backgroundColor = '#CEE7F2'; 
            makeScroll(addressItem);
            addressDetails.style.display= 'block';
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
}

async function getEditWindow(){
    var personID =document.getElementById('PersonIDHidden')?.innerText;

    await fetch("https://localhost:44309/api/Address/GetAddress/"+personID).then((Data)=>{
        return Data.json();   
    }).then((values)=>{
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
}

function addDetails(){
    let allAddress : any = addresslist.children;
    for(let i=0;i<allAddress.length;i++)
        {
            allAddress[i].style.backgroundColor = 'white';
            allAddress[i].style.overflowX = 'hidden';
        }
    addressDetails.style.display= 'none';
    addButton.style.display = 'block';
    saveButton.style.display = 'none';  
    inputForm.style.display = 'block'; 
}

async function saveDetails(e:any){
    if(validName&&validEmail&&validMobile&&validLandline&&validSite&&validAddress){

        let enteredName = entryName.value;
        let enteredEmail =   entryEmail.value; 
        let enterdedMobile = Number(entryMobile.value); 
        let enteredLandline = Number((entryLandline).value);
        let enteredWebsite =  entryWebsite.value; 
        let enteredAddress =  entryAddress.value;
        //const obj = new Person(enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress)
        //const obj1 = new FormData(inputForm as HTMLFormElement)

        await fetch("https://localhost:44309/api/Address/AddAddress",{
            method: "POST",
            body: JSON.stringify({
                name:enteredName,
                email: enteredEmail,
                phone: enterdedMobile,
                landline:enteredLandline,
                website: enteredWebsite,
                addressDetails: enteredAddress,
            }),
            headers: {
                "Content-type" : "application/json"
            }
        })
            .then(res=>res.json)
            .then(data=>console.log(data));
            (document.getElementById('Formid') as any).reset();
            inputForm.style.display = 'none';
            //extructDatabase();
            document.location.reload(); 
            //selectDetails(e);
            
    }
    else{
        alert('Please fill the form properly');
    }
    //document.location.reload();
    extructDatabase();
}


async function editDetails(e:any){
    formValidate();
    if(validName&&validEmail&&validMobile&&validLandline&&validSite&&validAddress){
        let enteredName = entryName.value;
        let enteredEmail =   entryEmail.value; 
        let enterdedMobile = Number(entryMobile.value); 
        let enteredLandline = Number((entryLandline).value);
        let enteredWebsite =  entryWebsite.value; 
        let enteredAddress =  entryAddress.value;

        await fetch("https://localhost:44309/api/Address/UpdateAddress",{
        method: "PUT",
        body: JSON.stringify({
            id:document.getElementById('PersonIDHidden')?.innerText,
            name:enteredName,
            email: enteredEmail,
            phone: enterdedMobile,
            landline:enteredLandline,
            website: enteredWebsite,
            addressDetails: enteredAddress,
            }),
        headers: {
            "Content-type" : "application/json"
            }
        });
        (document.getElementById('Formid') as any).reset();
        inputForm.style.display = 'none';
        
        
        var personID =document.getElementById('PersonIDHidden')?.innerText;
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
        fetchDetails(personID as string);
        
        
    }
        else{
            alert('Please fill the form properly');
        }
        extructDatabase();
        
}

async function deleteContact(){
    var pid = document.getElementById('PersonIDHidden')?.innerText;
    await fetch("https://localhost:44309/api/Address/DeleteAddress/"+pid, { method: 'DELETE' });
    //document.location.reload(); 
    extructDatabase();
    addressDetails.style.display = 'none';
}


async function fetchDetails(personID1:string){
    await fetch("https://localhost:44309/api/Address/GetAddress/"+personID1).then((Data)=>{
                return Data.json();   
            }).then((values)=>{
            let _personIdHidden : any = document.getElementById('PersonIDHidden');
            _personIdHidden.innerText = personID1;
            showDetails(values);
            addressDetails.style.display='block';

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

            })
}


/* form validation */
function nameValidate(){
    validName = false;
    let tempName =entryName.value;
    if(tempName.length==0){
        requiredName.innerHTML = 'Name is required';
    }
    else if(tempName.length>0){
    requiredName.innerHTML = '';
    validName=true;
    }
}

function validateEmail(){
    validEmail = false;
    let tempEmail = entryEmail.value;
    if(tempEmail.length===0){
        requiredEmail.innerHTML = 'Email is required';
    }
    else if(tempEmail.length>0){
        let valideMail = /^[0-9a-z.\s+_]+@[0-9a-z-.+]+\.[a-z]{2,4}$/;
        if(tempEmail.match(valideMail)){
            requiredEmail.innerHTML = '';
            validEmail = true;
        }
        else{
            requiredEmail.innerHTML = 'Email is incorrect';
        }
    }
}

function validateMobile(){
    validMobile = false;
    let tempMobile: any = entryMobile.value;
    if(tempMobile.length==0){
        requiredMobile.innerHTML = 'Mobile is required';
    }
    else if(tempMobile.length!=10 || (Number(tempMobile)%1)!=0){
        
            requiredMobile.innerHTML = 'Mobile is incorrect';
        }
    else{
        requiredMobile.innerHTML = '';
        validMobile = true;
    }

}

function validateLandline(){
    validLandline = false;
    let tempLandline : any = entryLandline.value;
    if(tempLandline.length==0){
        requiredLandline.innerHTML = 'Landline is required';
    }
    else if(tempLandline.length!=10 || (Number(tempLandline)%1)!=0){
        requiredLandline.innerHTML = 'Landline is incorrect';
    }
    else{
        requiredLandline.innerHTML = '';
        validLandline = true;
    }
}

function validateWebsite(){
    validSite = false;
    let tempSite =entryWebsite.value;
    if(tempSite.length==0){
        requiredSite.innerHTML = 'Website is required';
    }
    else if(tempSite.length>0){
    requiredSite.innerHTML = '';
    validSite=true;
    }
}

function validateAddress(){
    validAddress = false;
    let tempAddress =entryAddress.value;
    if(tempAddress.length==0){
        requiredAddress.innerHTML = 'Address is required';
    }
    else if(tempAddress.length>0){
    requiredAddress.innerHTML = '';
    validAddress=true;
    }
}

function formValidate(){
    nameValidate();
    validateEmail();
    validateMobile();
    validateLandline();
    validateWebsite();
    validateAddress();
}

function showDetails(obj: Person){
    
    let _name : any = document.getElementById('PersonName');
    _name.innerText = obj.name;
    let _email : any = document.getElementById('DetailEmail');
    _email.innerText = "Email: "+ obj.email;
    let _mobile : any = document.getElementById('DetailMobile');
    _mobile.innerText = "Mobile: "+'+91 '+obj.phone;
    let _landline : any = document.getElementById('DetailLandline');
    _landline.innerText = "Landline: "+obj.landline;
    let _website : any = document.getElementById('DetailSite');
    _website.innerText = "Website: "+'https://'+obj.website;
    let _address : any = document.getElementById('DetailAddress');
    _address.innerText = "Address: "+ obj.addressDetails;
    
}

function goToHome(){
    let allAddress : any = addresslist.children;
    for(let i=0;i<allAddress.length;i++)
        {
            allAddress[i].style.backgroundColor = 'white';
            allAddress[i].style.overflowX = 'hidden';
        }
    addressDetails.style.display= 'none';
    inputForm.style.display = 'none'; 
}

/* Extra functions added lastly after the feedback */

function makeScroll(element:any){
    if(overflow(element)){
        selectedContact.style.overflowX = "scroll"
    }
}

function overflow(tempElement:any) {
    return tempElement.scrollHeight > tempElement.clientHeight || tempElement.scrollWidth > tempElement.clientWidth;
}