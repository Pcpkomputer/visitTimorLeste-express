$('#table').bootstrapTable({
    height:800,
    pagination:true,
    search:true
});
$('.clockpicker').clockpicker({
    autoclose:true
});


document.querySelector("#updateTimeToursModal #addUpdateTimeTours").addEventListener("click",()=>{
            
        let day = document.querySelector("#updateTimeToursModal #dayTimeInputAdd").value;
        let from = document.querySelector("#updateTimeToursModal #fromTimeInputAdd").value;
        let to = document.querySelector("#updateTimeToursModal #toTimeInputAdd").value;

        let list = document.querySelectorAll("#updateTimeToursModal #rowAddToursTime");

        listDays = [];
        payloadValue = [];

        list.forEach((item,_)=>{
            listDays.push(item.querySelectorAll("td")[0].innerHTML);

            payloadValue.push({
                days:item.querySelectorAll("td")[0].innerHTML,
                from_time:item.querySelectorAll("td")[1].innerHTML,
                to_time:item.querySelectorAll("td")[2].innerHTML
            })
        })


        if(listDays.includes(day)){
            alert("Schedule already exist");
        }
        else{

            document.querySelector("#updateTimeToursModal #updateTimeToursValue").value=JSON.stringify([
                ...payloadValue,
                {
                    days:day,
                    from_time:from,
                    to_time:to
                }
            ]);

            document.querySelector("#updateTimeToursModal #contentAddTimeTours").innerHTML =
            document.querySelector("#updateTimeToursModal #contentAddTimeTours").innerHTML+
            `
            <tr id="rowAddToursTime">
                <td>${day}</td>
                <td>${from}</td>
                <td>${to}</td>
                <td>
                    <button class="btn btn-primary" id="btnDeleteRowsTime" type="button">Delete</button>
                </td>
            </tr>
            `;
        }
})


$(document).on("click","#btnEditTimeTours",async (e)=>{
    $("#updateTimeToursModal").modal();

    document.querySelector("#loadingIndicatorUpdateTimeTours").style.display="flex";

    let row = e.currentTarget.parentNode.parentNode;
    let id =  row.querySelectorAll("td")[0].getAttribute("data-id");

    let result = await fetch(`/api/tours/${id}/schedule`);
    let body = await result.json();

    document.querySelector("#updateTimeToursModal").action=`/api/tours/${id}/schedule/update`;


    document.querySelector("#updateTimeToursModal #updateTimeToursValue").value=JSON.stringify(body);

    
    let payload = "";

    body.forEach((item,_)=>{
        payload+=`
        <tr id="rowAddToursTime">
            <td>${item.days}</td>
            <td>${item.from_time}</td>
            <td>${item.to_time}</td>
            <td>
                <button class="btn btn-primary" id="btnDeleteRowsTime" type="button">Delete</button>
            </td>
        </tr>
        `
    })


    document.querySelector("#updateTimeToursModal #contentAddTimeTours").innerHTML=payload;

    document.querySelector("#loadingIndicatorUpdateTimeTours").style.display="none";
})

document.querySelector("#inputToursImageUpdate").addEventListener("change",(e)=>{
    if(e.target.files.length>0){
        let file = e.target.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#previewToursImageUpdate").src=url;
        }
        else{
            document.querySelector("#inputToursImageUpdate").value="";
            document.querySelector("#previewToursImageUpdate").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})

document.querySelector("#btnSubmitToursImageUpdate").addEventListener("click",()=>{
    document.querySelector("#inputToursImageUpdate").click();
})

$(document).on("click","#btnUpdate",()=>{
    $('#updateToursModal').modal();
})

document.querySelector("#addToursModal #btnSubmitTours").addEventListener("click",()=>{
    document.querySelector("#addToursModal #inputToursImage").click();
})

document.querySelector("#addToursModal #submitAddTours").addEventListener("click",(e)=>{
    let list = document.querySelectorAll("#addToursModal #rowAddToursTime");
    if(list.length===0){
        alert("Schedule must be set");
    }
    else{

        let payloadSchedule = [];
        let list = document.querySelectorAll("#addToursModal #rowAddToursTime");

        list.forEach((item,_)=>{
            payloadSchedule.push({
                days:item.querySelectorAll("td")[0].innerHTML,
                from:item.querySelectorAll("td")[1].innerHTML,
                to:item.querySelectorAll("td")[2].innerHTML
            })
        });

        document.querySelector("#addToursModal #inputScheduleAddTours").value=JSON.stringify(payloadSchedule);

        document.querySelector("#addToursModal #realSubmitAddTours").click();
    }
})

document.querySelector("#addToursModal #inputToursImage").addEventListener("change",(e)=>{
    if(e.target.files.length>0){
        let file = e.target.files[0];
        if(file.name.match(/(.jpg$|.png$)/)){
            let url = URL.createObjectURL(file);
            document.querySelector("#previewToursImage").src=url;
        }
        else{
            document.querySelector("#inputToursImage").value="";
            document.querySelector("#previewToursImage").src="";
            alert("Masukkan file dengan tipe data .jpg atau .png");
        }
    }
})

$(document).on("click","#btnUpdate",(e)=>{

    const element = ["id","category","name","address","website","phone","description","image"];

    let row = e.target.parentNode.parentNode.parentNode.parentNode;


    let idcategory = row.querySelector("#category").getAttribute("data-id");

    let contentDescription = row.querySelector("#description").getAttribute("data-value");



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

    document.querySelector("#updateToursModal").action=`api/tours/update/${filteredList[0]}`;
   
    let input = document.querySelectorAll("#inputUpdateTours");
    console.log(input);
    input.forEach((item,i)=>{
        item.value=filteredList[i];
    })

    document.querySelector("#updateToursModal .description").value=contentDescription;


    document.querySelector("#updateToursModal .categoryvalue").value=parseInt(idcategory);
    document.querySelector("#previewToursImageUpdate").src=filteredList[7];
    document.querySelector("#inputToursImageUpdate").value=filteredList[7];

})


$(document).on("click","#addToursModal #addTimeTours",(e)=>{

    let day = document.querySelector("#addToursModal #dayTimeInputAdd").value;
    let from = document.querySelector("#addToursModal #fromTimeInputAdd").value;
    let to = document.querySelector("#addToursModal #toTimeInputAdd").value;

    let list = document.querySelectorAll("#addToursModal #rowAddToursTime");

    listDays = [];

    list.forEach((item,_)=>{
        listDays.push(item.querySelectorAll("td")[0].innerHTML);
    })



    if(listDays.includes(day)){
        alert("Schedule already exist");
    }
    else{
        document.querySelector("#addToursModal #contentAddTimeTours").innerHTML =
        document.querySelector("#addToursModal #contentAddTimeTours").innerHTML+
        `
        <tr id="rowAddToursTime">
            <td>${day}</td>
            <td>${from}</td>
            <td>${to}</td>
            <td>
                <button class="btn btn-primary" id="btnDeleteRowsTime" type="button">Delete</button>
            </td>
        </tr>
        `;
    }
    
   
})

$(document).on("click","#btnDeleteRowsTime",(e)=>{
    e.currentTarget.parentNode.parentNode.outerHTML=""

    let list = document.querySelectorAll("#updateTimeToursModal #rowAddToursTime");

    payloadValue = [];

    list.forEach((item,_)=>{
        payloadValue.push({
            days:item.querySelectorAll("td")[0].innerHTML,
            from_time:item.querySelectorAll("td")[1].innerHTML,
            to_time:item.querySelectorAll("td")[2].innerHTML
        })
    })

    document.querySelector("#updateTimeToursModal #updateTimeToursValue").value=JSON.stringify(payloadValue);

})