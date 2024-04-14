
let disableSubmit={}
function handleSetSubmitAccess(){
    console.log(disableSubmit)
    if(disableSubmit.annualGrossIncomeHelp || disableSubmit.annualExtraIncomeHelp || disableSubmit.deductionsApplicableHelp){
        document.getElementById('submitBtn').setAttribute('disabled','')

    }
    else{
        document.getElementById('submitBtn').removeAttribute('disabled')

    }
}
const numberInputChange=(element)=>{
    const errorTip=element.parentNode.children[1]
    const elementId=element.id

    if(!element.value){
        errorTip.style.display="flex"
        errorTip.setAttribute('data-tip','Input field cannot be empty')
        element.parentNode.classList.add("error")
    }
    else{
        if(isNaN(element.value)){
            
            disableSubmit[elementId]=true
            errorTip.setAttribute('data-tip','Please enter numbers only')
    
            errorTip.style.display="flex"
            element.parentNode.classList.add("error")
            handleSetSubmitAccess()
        }
        else{
            disableSubmit[elementId]=false
            errorTip.style.display="none"
            element.parentNode.classList.remove("error")
            handleSetSubmitAccess()

        }
    }
   
    
}

function enableErrorShow(elementId){
    const element=document.getElementById(elementId)
    const errorToolTip=element.parentNode.children[1];

    element.parentNode.classList.add('error')

    errorToolTip.style.display="flex"
    errorToolTip.setAttribute('data-tip','Input field cannot be empty')
}
const handleSubmit=(event,element)=>{
    event.preventDefault();

    const form = new FormData(document.getElementById("form"));
    let grossIncomeVal = form.get("grossIncome");
    let extraIncomeVal = form.get("extraIncome");
    let ageGroupVal = form.get("ageGroup");
    let deductionsVal = form.get("deductions");

    if(!grossIncomeVal){
        enableErrorShow('annualGrossIncomeHelp')
    }
     if(!extraIncomeVal){
        enableErrorShow('annualExtraIncomeHelp')    
    }
     if(!deductionsVal){
        enableErrorShow('deductionsApplicableHelp')    
    }
    else{
    const formDataObj={grossIncomeVal,extraIncomeVal,ageGroupVal,deductionsVal}
    const result=calculateTax(formDataObj)
        if(disableSubmit){
            console.log("errors present")
        }
        else{
            console.log("done")
        }
        if(result){
            document.getElementById("modalTaxResult").style.display="flex"
            document.getElementById("afterTaxValText").textContent=result.incomeAfterTax
            document.getElementById("form").classList.toggle("blur")

        }
    }
}
function calculateTax(formDataObj){
    const {grossIncomeVal, extraIncomeVal, deductionsVal, ageGroupVal}=formDataObj
    const totalIncome=(Number(grossIncomeVal)+Number(extraIncomeVal)) -Number(deductionsVal)
    let tax=0;
    if(totalIncome>800000){
       if(ageGroupVal==1){
        tax= 0.3*(totalIncome);
       }
       else if(ageGroupVal==2){
        tax=0.4*(totalIncome)
       }
       else if(ageGroupVal==3){
        tax=0.10*(totalIncome)
       }
    }
    return {tax,incomeAfterTax:totalIncome-tax} 

}

function closeModal(element){
    document.getElementById('modalTaxResult').style.display="none"
    document.getElementById("form").classList.toggle("blur")

}