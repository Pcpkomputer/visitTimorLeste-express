$('#table').bootstrapTable({
    height:800,
    pagination:true,
    search:true
});


$(document).on("click", "#updateCategoryModal #btnUploadImageCategory",()=>{
    document.querySelector("#updateCategoryModal #inputCategoryImage").click();
})
$(document).on("change","#updateCategoryModal #inputCategoryImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#updateCategoryModal #previewCategoryImage").src=url;
        }
        else{
            document.querySelector("#updateCategoryModal #inputCategoryImage").value="";
            document.querySelector("#updateCategoryModal #previewCategoryImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})

$(document).on("click", "#addCategoryModal #btnUploadImageCategory",()=>{
    document.querySelector("#addCategoryModal #inputCategoryImage").click();
})
$(document).on("change","#addCategoryModal #inputCategoryImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#addCategoryModal #previewCategoryImage").src=url;
        }
        else{
            document.querySelector("#addCategoryModal #inputCategoryImage").value="";
            document.querySelector("#addCategoryModal #previewCategoryImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})

$(document).on("click","#btnUpdate",(e)=>{

    const element = ["id","name","image"];

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

    document.querySelector("#updateCategoryModal").action=`api/category/update/${filteredList[0]}`;
  

    let input = document.querySelectorAll("#inputUpdateCategory");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })


    document.querySelector("#updateCategoryModal #previewCategoryImage").src=filteredList[2];

})
