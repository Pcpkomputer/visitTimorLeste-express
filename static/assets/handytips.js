$("#contentAddTips").summernote({
    height:300
});




$(document).on("click","#btnUpdate",(e)=>{

    const element = ["name"];

    let row = e.target.parentNode.parentNode.parentNode.parentNode;
    

    let html = row.querySelector("#contentUpdateHandyTips").getAttribute("data-content");

    document.querySelector("#containerupdatetipscontent").innerHTML=`
        <label for="exampleFormControlInput1">Tips Content</label>
        <textarea required id="updatetipscontent" name="content" class="form-control"/>
    `;
    
    $("#updatetipscontent")[0].value=`${html}`;
    
    $("#updatetipscontent").summernote({
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




    let input = document.querySelectorAll("#updateHandyTipsModal #inputAddHandyTips");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })
    
    document.querySelector("#updateHandyTipsModal").action=`api/handytips/update/${filteredList[0]}`


})