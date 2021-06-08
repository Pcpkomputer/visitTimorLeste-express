$(document).on("keypress","#addUserModal .inputMiniType",(e)=>{
    if(e.charCode===13){
        e.preventDefault();

        let val = document.querySelector("#addUserModal .inputMiniType").value;

        
        if(val.length>0){
            document.querySelector("#addUserModal #contentMiniType").innerHTML=
            document.querySelector("#addUserModal #contentMiniType").innerHTML+
            `<span id="badgeMiniType" class="badge bg-primary mr-2" style="color:white;cursor:pointer">${val}</span>`;
    
            document.querySelector("#addUserModal .inputMiniType").value=``;
    
            let listbadge = document.querySelectorAll("#addUserModal #badgeMiniType");
            listbadge_ = [];
            listbadge.forEach((el,i)=>{
                listbadge_.push(el.innerHTML);
            })
            document.querySelector("#addUserModal #miniTypeInput").value=JSON.stringify(listbadge_);
        }

      
    }

})


$(document).on("keypress","#updateUserModal .inputMiniType",(e)=>{
    if(e.charCode===13){
        e.preventDefault();

        let val = document.querySelector("#updateUserModal .inputMiniType").value;

        
        if(val.length>0){
            document.querySelector("#updateUserModal #contentMiniType").innerHTML=
            document.querySelector("#updateUserModal #contentMiniType").innerHTML+
            `<span id="badgeMiniType" class="badge bg-primary mr-2" style="color:white;cursor:pointer">${val}</span>`;
    
            document.querySelector("#updateUserModal .inputMiniType").value=``;
    
            let listbadge = document.querySelectorAll("#updateUserModal #badgeMiniType");
            listbadge_ = [];
            listbadge.forEach((el,i)=>{
                listbadge_.push(el.innerHTML);
            })
            document.querySelector("#updateUserModal #miniTypeInput").value=JSON.stringify(listbadge_);
        }

      
    }

})


$(document).on("click","#addUserModal #badgeMiniType", (e)=>{
    e.currentTarget.outerHTML="";
    let listbadge = document.querySelectorAll("#addUserModal #badgeMiniType");
        listbadge_ = [];
        listbadge.forEach((el,i)=>{
            listbadge_.push(el.innerHTML);
        })
    document.querySelector("#addUserModal #miniTypeInput").value=JSON.stringify(listbadge_);
})


$(document).on("click","#updateUserModal #badgeMiniType", (e)=>{
    e.currentTarget.outerHTML="";
    let listbadge = document.querySelectorAll("#updateUserModal #badgeMiniType");
        listbadge_ = [];
        listbadge.forEach((el,i)=>{
            listbadge_.push(el.innerHTML);
        })
    document.querySelector("#updateUserModal #miniTypeInput").value=JSON.stringify(listbadge_);
})


$(document).on("click","#addUserModal #btnFakeSubmit",()=>{
    let badgeminitype = document.querySelectorAll("#addUserModal #badgeMiniType");
    if(badgeminitype.length===0){
        alert("Mini Type Must Inputed");
    }
    else{
        document.querySelector("#addUserModal #btnRealSubmit").click();
    }
  
})


$(document).on("click", "#addUserModal #btnUploadImageUser",()=>{
    document.querySelector("#addUserModal #inputUserImage").click();
})
$(document).on("change","#addUserModal #inputUserImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#addUserModal #previewUserImage").src=url;
        }
        else{
            document.querySelector("#addUserModal #inputUserImage").value="";
            document.querySelector("#addUserModal #previewUserImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})



$(document).on("click", "#updateUserModal #btnUploadImageUser",()=>{
    document.querySelector("#updateUserModal #inputUserImage").click();
})
$(document).on("change","#updateUserModal #inputUserImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#updateUserModal #previewUserImage").src=url;
        }
        else{
            document.querySelector("#updateUserModal #inputUserImage").value="";
            document.querySelector("#updateUserModal #previewUserImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})



$(document).on("click","#btnUpdate",(e)=>{


    const element = ["name", "type","aboutme","locals"];

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
    


    document.querySelector("#updateUserModal").action=`api/user/update/${filteredList[0]}`;
    let input = document.querySelectorAll("#updateUserModal #inputAddUser");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })



    let badgeminitype = row.querySelectorAll("#minitype span");
    
    let listbadge = [];
    let badgehtml = ``;
    badgeminitype.forEach((el,_)=>{
        listbadge.push(el.innerHTML);
        badgehtml=badgehtml+
        `
        <span id="badgeMiniType" class="badge bg-primary mr-2" style="color:white;cursor:pointer">${el.innerHTML}</span>
        `
    })
    document.querySelector("#updateUserModal #contentMiniType").innerHTML=badgehtml;

    document.querySelector("#updateUserModal #miniTypeInput").value=JSON.stringify(listbadge);
})

$(document).on("click","#updateUserModal #btnFakeSubmit",(e)=>{
    let listbadge = document.querySelectorAll("#updateUserModal #badgeMiniType");
    if(listbadge.length===0){
        alert("Minitype must more than 1");
    }
    else{
        document.querySelector("#updateUserModal #btnRealSubmit").click();
    }
})