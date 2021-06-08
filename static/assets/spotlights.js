$("#textareaspotlights").summernote({
    height:300
});

$('#table').bootstrapTable({
    height:800,
    pagination:true,
    search:true
});

$(document).on("click","#btnUpdate",(e)=>{

    
    const element = ["name","tours","image"];

    let row = e.target.parentNode.parentNode.parentNode.parentNode;
    

    let html = row.querySelector("#contentUpdateSpotlights").getAttribute("data-content");

    let idrelatedtours = row.querySelector("#tours").getAttribute("data-id");

    document.querySelector("#containerTextAreaSpotlight2").innerHTML=`
        <label for="exampleFormControlSelect1">Content</label>
        <textarea required name="content" style={{height:800}} id="textareaspotlights2"></textarea>    
    `;
    
    $("#textareaspotlights2")[0].value=`${html}`;
    
    $("#textareaspotlights2").summernote({
        height:300
    });    



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

    document.querySelector("#updateSpotlightsModal").action=`api/spotlights/update/${filteredList[0]}`;
  

    let input = document.querySelectorAll("#inputAddSpotlights");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })
    
    document.querySelector("#updateSpotlightsModal .relatedtoursinput").value=idrelatedtours;
    document.querySelector("#updateSpotlightsModal #previewSpotlightsImage").src=filteredList[3];

})


$(document).on("click", "#addSpotlightsModal #btnUploadImageSpotlights",()=>{
    document.querySelector("#addSpotlightsModal #inputSpotlightsImage").click();
})
$(document).on("change","#addSpotlightsModal #inputSpotlightsImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#addSpotlightsModal #previewSpotlightsImage").src=url;
        }
        else{
            document.querySelector("#addSpotlightsModal #inputSpotlightsImage").value="";
            document.querySelector("#addSpotlightsModal #previewSpotlightsImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})



$(document).on("click", "#updateSpotlightsModal #btnUploadImageSpotlights",()=>{
    document.querySelector("#updateSpotlightsModal #inputSpotlightsImage").click();
})
$(document).on("change","#updateSpotlightsModal #inputSpotlightsImage",(e)=>{
    if(e.currentTarget.files.length>0){
        let file = e.currentTarget.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#updateSpotlightsModal #previewSpotlightsImage").src=url;
        }
        else{
            document.querySelector("#updateSpotlightsModal #inputSpotlightsImage").value="";
            document.querySelector("#updateSpotlightsModal #previewSpotlightsImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})

