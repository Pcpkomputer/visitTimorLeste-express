let currentIndexCell = null;

let currentID = null;

$(document).on("click","#detailToursModal #btnSubmit",(e)=>{
    e.preventDefault();
    let list = Array.from(document.querySelectorAll("#detailToursModal #contentAddTours tr"));

    if(list.length>0){
        let payload = list.map((item,index)=>{
            let row = item.querySelectorAll("td");
            return {
                id_precinct:currentID,
                id_tours:row[0].innerHTML
            }
        });

        document.querySelector("#detailToursModal #jsonvalue").value=JSON.stringify(payload);

        document.querySelector("#detailToursModal").submit();
    }
    else{
        alert("Tours must more than 0");
    }
})

$(document).on("click","#detailToursModal #btnDeleteRow",(e)=>{
    e.currentTarget.parentNode.parentNode.outerHTML="";
})

$(document).on("click","#detailToursModal #btnAddTours",()=>{
    let index = document.querySelector("#detailToursModal .selectInputTours").value;
    let name = document.querySelector("#detailToursModal .selectInputTours").options[document.querySelector("#detailToursModal .selectInputTours").selectedIndex].text;


    let list = Array.from(document.querySelectorAll("#detailToursModal #contentAddTours tr"));

    list = list.filter((el,_)=>{
        let id = el.querySelectorAll("td")[0].innerHTML;
        return id===index;
    });

    if(list.length>0){
        alert("Duplicate tours...");
    }
    else{
        document.querySelector("#detailToursModal #contentAddTours").innerHTML=
        document.querySelector("#detailToursModal #contentAddTours").innerHTML+
        `
        <tr>
            <td>${index}</td>
            <td>${name}</td>
            <td>
                <button id="btnDeleteRow" type="button" class="btn btn-primary">Delete</button>
            </td>
        </tr>
        `
    }

  

})

$(document).on("click","#btnDetailTours",async (e)=>{

    let row = e.target.parentNode.parentNode;
    let id = row.querySelectorAll("td")[0].getAttribute("data-id");

    document.querySelector("#detailToursModal").action=`/api/precinct/${id}/tours/update`

    currentID = id;

    let listtours = await fetch(`/api/precinct/${id}/tours`);
    listtours = await listtours.json();

    document.querySelector("#detailToursModal #contentAddTours").innerHTML=``;

    let html = ``;

    listtours.forEach((item,index)=>{
        html=html+
        `
        <tr>
            <td>${item.id_tours}</td>
            <td>${item.name}</td>
            <td>
                <button id="btnDeleteRow" type="button" class="btn btn-primary">Delete</button>
            </td>
        </tr>
        `
    })

    document.querySelector("#detailToursModal #contentAddTours").innerHTML=html;
    
    document.querySelector("#detailToursModal #loadingIndicatorUpdateDetailTours").style.display="none";
})

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
        alert("Tours must more than 0");
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


    document.querySelector("#updatePrecinctModal #previewPrecinctImage").src=filteredList[4];
    
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
