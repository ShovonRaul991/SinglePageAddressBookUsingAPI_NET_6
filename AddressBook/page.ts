import {Person} from './Person.js'
import {extructData, selectDetail,saveDetail,updateDetail,deleteDetail} from './Services.js'


var elements:any;
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

let selectedContact:any;
let validName:boolean=false,validEmail:boolean=false,validMobile:boolean=false,validLandline:boolean=false,validSite:boolean=false,validAddress:boolean=false;

async function dataLoad(){
     await extructData().then((objectData)=>{
        let addressData = "";
        objectData.map((values:any)=>{
            //console.log(values)
            addressData +=`<div class="contact-list-item" id=${values.id}>
            <p class="contact-name">${values.name}</p>
            <p class="contact-email">${values.email}</p>
            <p class="contact-mobile">+91 ${values.phone}</p>
        </div>`;
        });
        (document.getElementById("ContactListItems") as HTMLDivElement).innerHTML = addressData; 
        elements = document.getElementsByClassName("contact-list-item"); 
        
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", function(event:any) {
              // get the ID of the clicked element from the event object
            var id= event.currentTarget.id;
            //selection logic
            selectDetail(id).then((singleObjectData)=>{
                console.log(singleObjectData);
                let allAddress : any = addresslist.children;
                for(let i=0;i<allAddress.length;i++)
                    {
                        allAddress[i].style.backgroundColor = 'white';
                        allAddress[i].style.overflowX = 'hidden';
                    }
                (document.getElementById(id) as HTMLDivElement).style.backgroundColor="#CEE7F2";
                let human = new Person(singleObjectData.name,
                    singleObjectData.email,
                    singleObjectData.phone,
                    singleObjectData.landline,
                    singleObjectData.website,
                    singleObjectData.addressDetails);
                showDetails(human);
                inputForm.style.display = 'none';
                addressDetails.style.display ='block';
                
                
                //edit the contact
                (document.getElementById("IconEdit") as HTMLDivElement).addEventListener('click',function(){
                    addressDetails.style.display ='none';
                    inputForm.style.display = 'block';
                    addButton.style.display = 'none';
                    saveButton.style.display = 'block'
                    entryName.value = (document.getElementById('PersonName') as HTMLDivElement).innerText;
                    entryEmail.value = singleObjectData.email;
                    entryMobile.value = singleObjectData.phone;
                    entryLandline.value = singleObjectData.landline;
                    entryWebsite.value = singleObjectData.website;
                    entryAddress.value = singleObjectData.addressDetails;
                    formValidate();
                    console.log((document.getElementById('PersonName') as HTMLDivElement).innerText)
                    console.log(entryName)    
                    });

                    

                    saveButton.addEventListener('click',function(){
                        let enteredID = selectedContact;
                        let enteredName = entryName.value;
                        let enteredEmail =   entryEmail.value; 
                        let enterdedMobile = Number(entryMobile.value); 
                        let enteredLandline = Number((entryLandline).value);
                        let enteredWebsite =  entryWebsite.value; 
                        let enteredAddress =  entryAddress.value;

                        updateDetail(enteredID,enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress)
                        addressDetails.style.display='none';
                        location.reload();
                    });

                    document.getElementById("IconDelete")?.addEventListener('click',function(){
                        deleteDetail(selectedContact);
                        location.reload();
                    })
            });
                selectedContact=id;

                
                
            });
            
          }
          
    });
}

document.addEventListener('DOMContentLoaded', () => {
    dataLoad()

    document.getElementById("AddAddress")?.addEventListener('click',function(){
        let allAddress : any = addresslist.children;
        for(let i=0;i<allAddress.length;i++)
            {
                allAddress[i].style.backgroundColor = 'white';
                allAddress[i].style.overflowX = 'hidden';
            }
        inputForm.style.display = 'block';
        addressDetails.style.display = 'none';   
    });
});




addButton.addEventListener('click',function(){
    //formValidate();
    if(validName&&validEmail&&validMobile&&validLandline&&validSite&&validAddress){
        let enteredName = entryName.value;
        let enteredEmail =   entryEmail.value; 
        let enterdedMobile = Number(entryMobile.value); 
        let enteredLandline = Number((entryLandline).value);
        let enteredWebsite =  entryWebsite.value; 
        let enteredAddress =  entryAddress.value;
        saveDetail(enteredName,enteredEmail,enterdedMobile,enteredLandline,enteredWebsite,enteredAddress);
        inputForm.style.display = 'none';
        window.location.reload()
        
    }
    else{
        alert('Please fill the form properly');
    }
    
});





entryName.addEventListener('input',function(){
    nameValidate();
});
entryEmail.addEventListener('input',function(){
    validateEmail();
});
entryMobile.addEventListener('input',function(){
    validateMobile();
});
entryLandline.addEventListener('input',function(){
    validateLandline();
});
entryWebsite.addEventListener('input',function(){
    validateWebsite();
});
entryAddress.addEventListener('input',function(){
    validateAddress();
});



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

(document.getElementById('Home') as HTMLElement).addEventListener('click',function(){
    let allAddress : any = addresslist.children;
    for(let i=0;i<allAddress.length;i++)
        {
            allAddress[i].style.backgroundColor = 'white';
            allAddress[i].style.overflowX = 'hidden';
        }
    addressDetails.style.display= 'none';
    inputForm.style.display = 'none';
});
/*
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
*/
/* Extra functions added lastly after the feedback */
/*
function makeScroll(element:any){
    if(overflow(element)){
        selectedContact.style.overflowX = "scroll"
    }
}

function overflow(tempElement:any) {
    return tempElement.scrollHeight > tempElement.clientHeight || tempElement.scrollWidth > tempElement.clientWidth;
}
*/