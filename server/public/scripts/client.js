console.log("client.js is sourced!");

document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.querySelector('[data-testid="calculator"]');
  const recentResultSection = document.querySelector(
    '[data-testid="recentResult"]'
  );
  const resultHistorySection = document.querySelector(
    '[data-testid="resultHistory"]'
  );

  calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleCalculation();
  });
});

function handleCalculation() {
  // Get input values from the form
  const numOneInput = document.querySelector('[placeholder="First Number"]');
  const numTwoInput = document.querySelector('[placeholder="Second Number"]');
  const operatorInput = document.querySelector(".operator:checked");

  // Check if inputs are found
  if (!numOneInput || !numTwoInput || !operatorInput) {
    console.error("Input elements not found");
    return;
  }

  // Get input values
  const numOne = parseFloat(numOneInput.value);
  const numTwo = parseFloat(numTwoInput.value);
  const operator = operatorInput.value;

  // Check if input values are valid numbers
  if (isNaN(numOne) || isNaN(numTwo)) {
    console.error("Invalid input values");
    return;
  }

  // Send calculation data to the server
  const calculationData = { numOne, numTwo, operator };
  sendCalculation(calculationData);
}

// Function to send calculation data to the server
function sendCalculation(calculationData) {
  // Send calculation data to server using Axios or Fetch
  // Example:
  // axios.post('/calculations', calculationData)
  //   .then(response => {
  //     // Handle success
  //   })
  //   .catch(error => {
  //     // Handle error
  //   });
}
