import React, { useState } from "react";
import styles from "./Gender.module.css";

const Gender = ({ name, label = "Gender", value, onChange }) => {

  // component-level selected state
  const [selected, setSelected] = useState(value || "");

  const genderOptions = [
    { id: 1, label: "Male", value: "MALE" },
    { id: 2, label: "Female", value: "FEMALE" }
  ];

  const handleSelect = (val) => {
    setSelected(val);
    onChange && onChange(name, val); // send back to parent if needed
  };

  return (
    <div className={styles.gender_wrapper}>
      <p className={styles.gender_label}>{label}</p>
      <div className={styles.gender_content}>
        {genderOptions.map((option) => (
          <label
            key={option.id}
            className={`${styles.gender_option} ${
              selected === option.value ? styles.active : ""
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Gender;
