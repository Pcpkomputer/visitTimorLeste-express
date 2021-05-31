document.querySelector("#btnSubmitTours").addEventListener("click",()=>{
    document.querySelector("#inputToursImage").click();
})

document.querySelector("#inputToursImage").addEventListener("change",(e)=>{
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
