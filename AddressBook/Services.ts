export async function extructData(){
    
    var data = await fetch("https://localhost:44309/Address/get").then((Data)=>
    Data.json()
    );
    //console.log("loaded")
    return data;
}

export async function selectDetail(id:any){
    var singleData = await fetch("https://localhost:44309/Address/get/"+id).then((Data)=>
    Data.json()
    );
    console.log(singleData[0]);
    return singleData[0];
}

export function saveDetail(enteredName:string,enteredEmail:string,enterdedMobile:number,enteredLandline:number,enteredWebsite:string,enteredAddress:string){
    let post=async()=>await fetch("https://localhost:44309/Address/add",{
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
    });
    post();
    
}

export async function updateDetail(enteredID:string,enteredName:string,enteredEmail:string,enterdedMobile:number,enteredLandline:number,enteredWebsite:string,enteredAddress:string){
    await fetch("https://localhost:44309/Address/update",{
        method: "PUT",
        body: JSON.stringify({
            id:enteredID,
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
}

export function deleteDetail(personId:string){
    let del=async()=>await fetch("https://localhost:44309/Address/delete/"+personId, { method: 'DELETE' });
    del();
}