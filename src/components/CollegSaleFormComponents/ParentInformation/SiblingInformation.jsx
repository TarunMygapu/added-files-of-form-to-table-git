import React, { useState } from "react";
import styles from "./SiblingInformation.module.css";

import {
  siblingsInformationFields,
  siblingFieldsLayout,
} from "./parentInformationFields";

import { renderField } from "../../../utils/renderField";

// API Hooks
import {
  useGetRelationTypes,
  useGetAllClasses
} from "../../../queires/saleApis/clgSaleApis";

const SiblingInformation = () => {
  const [values, setValues] = useState({
    fullName: "",
    relationType: "",
    selectClass: "",
    schoolName: "",
  });

  const setFieldValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch dropdown values
  const { data: relationData } = useGetRelationTypes();
  const { data: classData } = useGetAllClasses();
  console.log("Class:", classData);

  // Build field map with API values
  const fieldMap = siblingsInformationFields.reduce((acc, f) => {
    let field = { ...f };

    if (f.name === "relationType") {
      field.options = relationData?.data.map((r) => r.name) || [];
    }

    if (f.name === "selectClass") {
      field.options = classData?.data.map((c) => c.name) || [];
    }

    acc[f.name] = field;
    return acc;
  }, {});

  // Clear sibling fields
  const handleClear = () => {
    setValues({
      fullName: "",
      relationType: "",
      selectClass: "",
      schoolName: "",
    });
  };

  return (
    <div className={styles.siblingInformationWrapper}>
      <div className={styles.clgAppSaleParentsInfoTop}>
        <p className={styles.clgAppSaleParentsHeading}>Sibling Information</p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.siblingsFieldsWrapper}>
        <p className={styles.siblingTitle}>Sibling 1</p>

        {siblingFieldsLayout.map((row) => (
          <div key={row.id} className={styles.clgAppSalerow}>
            {row.fields.map((fname) => (
              <div key={fname} className={styles.clgAppSaleFieldCell}>
                {fname &&
                  renderField(fname, fieldMap, {
                    value: values[fname] ?? "",
                    onChange: (e) => setFieldValue(fname, e.target.value),
                  })}
              </div>
            ))}

            {/* Buttons on the right */}
            <div className={styles.siblingButtons}>
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
              >
                Clear
              </button>

              <button
                type="button"
                className={styles.siblingsCloseButton}
                onClick={() => console.log("Close sibling clicked")}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiblingInformation;
