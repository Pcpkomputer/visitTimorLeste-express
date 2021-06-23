$(document).on("click","#btnUpdate",(e)=>{


    const element = ["firstname","lastname","email","password"];

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
    });

    document.querySelector("#updateAccountModal").action=`api/account/update/${filteredList[0]}`;

    let input = document.querySelectorAll("#updateAccountModal #inputAddAccount");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })


    $("#updateAccountModal").modal();
})

$(document).on("click","#addAccountModal #btnFakeSubmit",()=>{
    document.querySelector("#addAccountModal #btnRealSubmit").click();
})


$(document).on("click","#updateAccountModal #btnFakeSubmit",()=>{
    document.querySelector("#updateAccountModal #btnRealSubmit").click();
})