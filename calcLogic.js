
let disableSubmit=true
// const handleSubmitEnable=()=>{
//     if(disableSubmit){
//         document.getElementById("submitBtn").setAttribute("disabled","")
    
//     }
//     else{
//         document.getElementById("submitBtn").removeAttribute("disabled")
    
//     }
// }

// handleSubmitEnable()
const numberInputChange=(element)=>{
    const errorTip=element.parentNode.children[1]
    if(isNaN(element.value) || !element.value){
        disableSubmit=true

        errorTip.style.display="flex"
        element.parentNode.classList.add("error")
    }
    else{
        disableSubmit=false
        errorTip.style.display="none"
        element.parentNode.classList.remove("error")
    }
}


const handleSubmit=(event,element)=>{
    event.preventDefault();
    const form = new FormData(document.getElementById("form"));
    let grossIncome = form.get("grossIncome");
    let extraIncome = form.get("extraIncome");
    console.log({grossIncome,extraIncome})

    // if(!isError){
        console.log(element)
        console.log("done")
    // }
}

const validate=(value)=>{
    if(!value) return false;
    return true;
}