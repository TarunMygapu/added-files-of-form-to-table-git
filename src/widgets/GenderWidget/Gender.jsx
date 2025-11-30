import React, { useState, useEffect } from "react";
import styles from "./Gender.module.css";

const Gender = ({ name, label = "Gender", value, onChange }) => {

  // component-level selected state
  const [selected, setSelected] = useState(value || "");

  // Sync selected state when value prop changes (controlled component)
  useEffect(() => {
    setSelected(value || "");
  }, [value]);

  const genderOptions = [
    { id: 1, label: "Male", value: "MALE" },
    { id: 2, label: "Female", value: "FEMALE" }
  ];

  const handleSelect = (val) => {
    setSelected(val);
    // Call onChange with event-like object for Formik compatibility
    // Formik expects: onChange(e) where e.target.value contains the value
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
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
