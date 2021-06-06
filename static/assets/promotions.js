$(".disclaimernote").summernote({
    height:300
});

$(".termsandconditionsnote").summernote({
    height:300
});

$(".redemptioninstructionnote").summernote({
    height:300
});

$(".descriptionnote").summernote({
    height:300
});




$(document).on("click","#btnUpdate",(e)=>{

    
    const element = ["promotions","relatedtours","from","to","description"];

    let row = e.target.parentNode.parentNode.parentNode.parentNode;
    

    // let html = row.querySelector("#contentUpdateSpotlights").getAttribute("data-content");

    // document.querySelector("#containerTextAreaSpotlight2").innerHTML=`
    //     <label for="exampleFormControlSelect1">Content</label>
    //     <textarea required style={{height:800}} id="textareaspotlights2"></textarea>    
    // `;
    
    // $("#textareaspotlights2")[0].value=`${html}`;
    
    // $("#textareaspotlights2").summernote({
    //     height:300
    // });    



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

    let description = row.querySelector("#description #content").getAttribute("data-content");


    document.querySelector("#containerDescription").innerHTML=`
        <label for="exampleFormControlInput1">Description</label>
        <textarea id="inputAddPromotions" required name="id" type="text" class="form-control descriptionnote" placeholder="Description"/>
    `;
    
    $("#containerDescription #inputAddPromotions.descriptionnote")[0].value=`${description}`;
    
    $("#containerDescription #inputAddPromotions.descriptionnote").summernote({
        height:300
    });    


    let redemptioninstruction = row.querySelector("#redemptioninstruction #content").getAttribute("data-content");

    
    document.querySelector("#containerRedemptionInstruction").innerHTML=`
            <label for="exampleFormControlInput1">Redemption Instruction</label>
            <textarea id="inputAddPromotions" required name="id" type="text" class="form-control redemptioninstructionnote" placeholder="Redemption Instruction"/>
    `;
    
    $("#containerRedemptionInstruction #inputAddPromotions.redemptioninstructionnote")[0].value=`${redemptioninstruction}`;
    
    $("#containerRedemptionInstruction #inputAddPromotions.redemptioninstructionnote").summernote({
        height:300
    });    



    let termsandconditions = row.querySelector("#termsandconditions #content").getAttribute("data-content");

      
    document.querySelector("#containerTermsAndConditions").innerHTML=`
        <label for="exampleFormControlInput1">Terms and Conditions</label>
        <textarea id="inputAddPromotions" required name="id" type="text" class="form-control termsandconditionsnote" placeholder="Terms and Conditions"/>
    `;
    
    $("#containerTermsAndConditions #inputAddPromotions.termsandconditionsnote")[0].value=`${termsandconditions}`;
    
    $("#containerTermsAndConditions #inputAddPromotions.termsandconditionsnote").summernote({
        height:300
    });    


    
    let disclaimer = row.querySelector("#disclaimer #content").getAttribute("data-content");



    document.querySelector("#containerDisclaimer").innerHTML=`
            <label for="exampleFormControlInput1">Disclaimer</label>
            <textarea id="inputAddPromotions" required name="id" type="text" class="form-control disclaimernote" placeholder="Disclaimer"/>
    `;

    $("#containerDisclaimer #inputAddPromotions.disclaimernote")[0].value=`${disclaimer}`;

    $("#containerDisclaimer #inputAddPromotions.disclaimernote").summernote({
        height:300
    });    




    document.querySelector("#updatePromotionsModal").action=`api/promotions/update/${filteredList[0]}`;
  

    let input = document.querySelectorAll("#updatePromotionsModal #inputAddPromotions");
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })
    


})
