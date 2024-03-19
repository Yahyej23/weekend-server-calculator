const express = require("express");
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static("server/public"));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

// Here's a wonderful place to make some routes:

// GET /calculations route to send the calculations array back to the client
app.get("/calculations", (req, res) => {
  res.json(calculations);
});

// POST /calculations route to handle new calculations
app.post("/calculations", (req, res) => {
  const { numOne, numTwo, operator } = req.body;

  // Check if all necessary fields are provided
  if (!numOne || !numTwo || !operator) {
    return res.status(400).json({ error: "Missing input data" });
  }

  let result;

  // Perform the mathematical operation based on the operator
  switch (operator) {
    case "+":
      result = numOne + numTwo;
      break;
    case "-":
      result = numOne - numTwo;
      break;
    case "*":
      result = numOne * numTwo;
      break;
    case "/":
      if (numTwo === 0) {
        return res.status(400).json({ error: "Division by zero" });
      }
      result = numOne / numTwo;
      break;
    default:
      return res.status(400).json({ error: "Invalid operator" });
  }

  // Create a new calculation object
  const newCalculation = {
    numOne,
    numTwo,
    operator,
    result,
  };

  // Push the new calculation object into the calculations array
  calculations.push(newCalculation);

  // Send status 201 (Created) back to the client
  res.status(201).json({ message: "Calculation created successfully" });
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === "test") {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log("server running on: ", PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
