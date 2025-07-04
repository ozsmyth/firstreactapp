import React, { useState } from "react";
import Button from "./button";

const div_style = {
  width: "60%",
  background: "aliceblue",
  marginLeft: "20%",
  display: "flex",
  flexDirection: "column",
  padding: "20px 10px 25px 10px",
  boxShadow: "1px 1px 6px rgba(12,14,12,0.3)",
  // boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  marginBottom: "20px",
};

export default function QuizCard({ number, question, options }) {
  const [selectedOption, setSelectedOption] = useState(""); // State Management for selected options

  const OptionChange = (e) => {
    const newOption = e.target.value;
    console.log("Previous selected option: ", selectedOption); //use directly before updating
    setSelectedOption(newOption);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      alert("You selected: " + selectedOption);
      // setSelectedOption(''); // Reset selection after submit
    } else {
      alert("Please select an option before Submitting.");
    }
  };

  return (
    <div style={div_style}>
      <h2>Question {number}</h2>
      <h3>{question}</h3>

      {options.map((option, index) => (
        <div key={index} className="option">
          <label>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={OptionChange}
              name="quiz"
            />
            {option}
          </label>
        </div>
      ))}

      {/* pass the function as a prop inside the button componet */}
      <Button text="Submit" onClick={handleSubmit} />

      {selectedOption !== null ? (
        <p>{selectedOption}</p>
      ) : (
        <p>You have not selected any answer.</p>
      )}
    </div>
  );
}
// style={{ border: "1px solid #ccc", padding: "20px", width: "300px", borderRadius: "8px" }}>
