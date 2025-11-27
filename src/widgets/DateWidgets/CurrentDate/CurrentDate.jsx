import React, { useState, useEffect } from "react";
import styles from "./CurrentDate.module.css"; // Assuming you have relevant CSS in this file

const CurrentDate = ({label}) => {
  // 1. State to hold the formatted current date string
  const [currentDate, setCurrentDate] = useState("");

  // 2. useEffect to calculate and set the date when the component mounts
  useEffect(() => {
    const today = new Date();

    // Helper function to ensure two digits (e.g., 01, 09)
    const padToTwoDigits = (num) => String(num).padStart(2, '0');

    // Extract day, month, and year
    const day = padToTwoDigits(today.getDate());
    const month = padToTwoDigits(today.getMonth() + 1); // Month is 0-indexed, so add 1
    const year = today.getFullYear();

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    // Set the state
    setCurrentDate(formattedDate);
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className={styles.dateContainer}>
      <label htmlFor="currentDateInput">{label}</label>
      <input
        id="currentDateInput"
        type="text" // Using 'text' type as requested
        value={currentDate} // Display the calculated date
        readOnly // Prevents user from typing in the input field
        className={styles.dateInput} // Apply any specific styling
      />
    </div>
  );
};

export default CurrentDate;