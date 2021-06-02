$('#table').bootstrapTable({
    height:800,
    pagination:true,
    search:true
});


$(document).on("click","#btnUpdate",(e)=>{

    
    const element = ["tours","user","quote","whyshouldvisit","specialtip"];

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

    document.querySelector("#updateLocalReviewModal").action=`api/localreview/update/${filteredList[0]}`;
  

    let input = document.querySelectorAll("#inputAddLocalReview");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })
    
})