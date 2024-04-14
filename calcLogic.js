let disableSubmit = {};

const numberInputChange = (element) => {
  const errorTip = element.parentNode.children[1];
  const elementId = element.id;

  if (!element.value) {
    errorTip.style.display = "flex";
    disableSubmit[elementId] = true;
    errorTip.setAttribute("data-tip", "Input field cannot be empty");
    element.parentNode.classList.add("error");
  } else {
    if (isNaN(element.value)) {
      disableSubmit[elementId] = true;
      errorTip.setAttribute("data-tip", "Please enter numbers only");

      errorTip.style.display = "flex";
      element.parentNode.classList.add("error");
    } else {
      disableSubmit[elementId] = false;
      errorTip.style.display = "none";
      element.parentNode.classList.remove("error");
    }
  }
};
const handleSubmit = (event, element) => {
  event.preventDefault();

  const form = new FormData(document.getElementById("form"));
  let grossIncomeVal = form.get("grossIncome");
  let extraIncomeVal = form.get("extraIncome");
  let ageGroupVal = form.get("ageGroup");
  let deductionsVal = form.get("deductions");

  if (!grossIncomeVal) {
    enableErrorShow("annualGrossIncomeHelp");
  }
  if (!extraIncomeVal) {
    enableErrorShow("annualExtraIncomeHelp");
  }
  if (!deductionsVal) {
    enableErrorShow("deductionsApplicableHelp");
  } else {
    const formDataObj = {
      grossIncomeVal,
      extraIncomeVal,
      ageGroupVal,
      deductionsVal,
    };

    //check if all input is valid
    if (
      disableSubmit.annualGrossIncomeHelp ||
      disableSubmit.annualExtraIncomeHelp ||
      disableSubmit.deductionsApplicableHelp
    ) {
      console.log("errors present");
    //   handleSetSubmitAccess(false);
    } else {
    //   handleSetSubmitAccess(true);
      const result = calculateTax(formDataObj);

      //show result in modal
      if (result) {
        renderTaxResultModal(result);
      }
    }
  }
};
function renderTaxResultModal(result) {
  document.getElementById("modalTaxResult").style.display = "flex";
  document.getElementById("afterTaxValText").textContent =
    result.incomeAfterTax;
  document.getElementById("form").classList.toggle("blur");
}

function enableErrorShow(elementId) {
  disableSubmit[elementId] = true;
  const element = document.getElementById(elementId);
  const errorToolTip = element.parentNode.children[1];

  element.parentNode.classList.add("error");

  errorToolTip.style.display = "flex";
  errorToolTip.setAttribute("data-tip", "Input field cannot be empty");
}

function handleSetSubmitAccess(access) {
  if (access) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", "");
  }
}

function calculateTax(formDataObj) {
  const { grossIncomeVal, extraIncomeVal, deductionsVal, ageGroupVal } =
    formDataObj;
  const totalIncome =
    Number(grossIncomeVal) + Number(extraIncomeVal) - Number(deductionsVal);
  let tax = 0;
  if (totalIncome > 800000) {
    if (ageGroupVal == 1) {
      tax = 0.3 * totalIncome;
    } else if (ageGroupVal == 2) {
      tax = 0.4 * totalIncome;
    } else if (ageGroupVal == 3) {
      tax = 0.1 * totalIncome;
    }
  }
  return { tax, incomeAfterTax: totalIncome - tax };
}

const closeModal = (element) => {
  document.getElementById("modalTaxResult").style.display = "none";
  document.getElementById("form").classList.toggle("blur");
};
