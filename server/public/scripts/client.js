console.log("client.js is sourced!");
// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch calculation history from the server
  const fetchCalculationHistory = () => {
    // Use Axios to make a GET request to '/calculations' endpoint
    axios
      .get("/calculations")
      .then((response) => {
        // Process the response data and update the calculation history UI
        updateCalculationHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching calculation history:", error);
      });
  };

  // Function to update the calculation history UI
  const updateCalculationHistory = (calculations) => {
    // Get the resultHistory section element
    const resultHistorySection = document.querySelector(
      '[data-testid="resultHistory"]'
    );
    // Clear previous content
    resultHistorySection.innerHTML = "";

    // Loop through the calculations array and create list items for each calculation
    calculations.forEach((calculation) => {
      // Create a list item
      const listItem = document.createElement("li");
      listItem.textContent = `${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}`;
      // Append the list item to the resultHistory section
      resultHistorySection.appendChild(listItem);
    });
  };

  // Function to display the most recent calculation result
  const displayRecentResult = (result) => {
    // Get the recentResult section element
    const recentResultSection = document.querySelector(
      '[data-testid="recentResult"]'
    );
    // Update the content
    recentResultSection.textContent = `Answer: ${result}`;
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form element
    const form = event.target;
    // Extract input values
    const numOne = parseFloat(form.elements[0].value);
    const numTwo = parseFloat(form.elements[5].value);
    const operator = form.elements[1].textContent; // Assuming the operator button is the second button

    // Create data object to send to the server
    const data = {
      numOne,
      numTwo,
      operator,
    };

    // Use Axios to make a POST request to '/calculations' endpoint
    axios
      .post("/calculations", data)
      .then((response) => {
        // Update the calculation history and the recent result UI
        fetchCalculationHistory();
        displayRecentResult(response.data.result);
      })
      .catch((error) => {
        console.error("Error making calculation:", error);
      });
  };

  // Function to handle "C" button click to clear input fields
  const handleClearButtonClick = () => {
    // Get the input elements
    const inputFields = document.querySelectorAll(
      '[data-testid="calculator"] input'
    );
    // Reset the value of each input field to an empty string
    inputFields.forEach((input) => {
      input.value = "";
    });
  };

  // Add event listener to the form for form submission
  const calculatorForm = document.querySelector('[data-testid="calculator"]');
  calculatorForm.addEventListener("submit", handleFormSubmit);

  // Add event listener to the "C" button to clear input fields
  const clearButton = document.querySelector(
    '[data-testid="calculator"] button:last-of-type'
  );
  clearButton.addEventListener("click", handleClearButtonClick);

  // Fetch calculation history from the server when the page loads
  fetchCalculationHistory();
});
