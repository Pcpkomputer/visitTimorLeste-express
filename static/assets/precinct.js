let currentIndexCell = null;

$(document).on("click","#addPrecinctModal #btnFakeSubmit",(e)=>{
    let list = document.querySelectorAll("#addPrecinctModal #contentAddPrecinct #rowInputTours");

    let payloadjson = [];

    list.forEach((el,index)=>{
        let td = el.querySelectorAll("td");
        let idtours = td[0].innerHTML;
        payloadjson.push(idtours);
    })

    document.querySelector("#addPrecinctModal #jsonlisttours").value=JSON.stringify(payloadjson);

    if(list.length>0){
        document.querySelector("#addPrecinctModal #btnRealSubmit").click();
    }
    else{
        alert("Precinct must more than 0");
    }
})

$(document).on("click","#addPrecinctModal #btnAddTours",(e)=>{
    let id = document.querySelector('#addPrecinctModal .selectInputTours').value;
    let name = document.querySelector('#addPrecinctModal .selectInputTours');

    let list = document.querySelectorAll("#addPrecinctModal #rowInputTours");

    let listFiltered = [];

    list.forEach((el,_)=>{
        listFiltered.push(el.querySelectorAll("td")[0].innerHTML);
    })

    if(listFiltered.includes(id)){
        alert("Tours must only have 1")
    }
    else{
        name = name.options[name.selectedIndex].innerHTML;

        document.querySelector("#addPrecinctModal #contentAddPrecinct").innerHTML=
        document.querySelector("#addPrecinctModal #contentAddPrecinct").innerHTML+
        `
        <tr id="rowInputTours">
            <td>${id}</td>
            <td>${name}</td>
            <td>
                <button id="clickDeleteRowInputTours" type="button" class="btn btn-danger">Delete</button>
            </td>
        <tr>
        `;
    }


})

$(document).on("click","#clickDeleteRowInputTours",(e)=>{
    e.currentTarget.parentNode.parentNode.outerHTML=``;
})



$(document).on("click","#btnUpdate",(e)=>{

    
    const element = ["precinct","minidescription","description","image"];

    let row = e.target.parentNode.parentNode.parentNode.parentNode;

    let list = row.querySelectorAll("td");

    let filteredList = [
        row.querySelector("td").getAttribute("data-id")
    ];

    list.forEach((el,i)=>{
        if(element.includes(el.id)){
            if(el.childNodes[0].localName==="img"){
                filteredList.push(el.childNodes[0].src);
            }
            else{
                filteredList.push(el.innerHTML);
            }
            
        }
    })

    currentIndexCell = filteredList[0];

    document.querySelector("#updatePrecinctModal").action=`api/precinct/update/${filteredList[0]}`;
  

    let input = document.querySelectorAll("#updatePrecinctModal #inputAddPrecinct");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })

    document.querySelector("#updatePrecinctModal #previewPrecinctImage").src=filteredList[3];
    
})


$(document).on("click", "#updatePrecinctModal #btnUploadImagePrecinct",()=>{
    document.querySelector("#updatePrecinctModal #inputPrecinctImage").click();
})
$(document).on("change","#updatePrecinctModal #inputPrecinctImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#updatePrecinctModal #previewPrecinctImage").src=url;
        }
        else{
            document.querySelector("#updatePrecinctModal #inputPrecinctImage").value="";
            document.querySelector("#updatePrecinctModal #previewPrecinctImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})




$(document).on("click", "#addPrecinctModal #btnUploadImagePrecinct",()=>{
    document.querySelector("#addPrecinctModal #inputPrecinctImage").click();
})
$(document).on("change","#addPrecinctModal #inputPrecinctImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#addPrecinctModal #previewPrecinctImage").src=url;
        }
        else{
            document.querySelector("#addPrecinctModal #inputPrecinctImage").value="";
            document.querySelector("#addPrecinctModal #previewPrecinctImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})
