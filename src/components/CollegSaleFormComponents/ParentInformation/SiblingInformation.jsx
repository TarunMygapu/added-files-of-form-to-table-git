import React, { useState } from "react";
import styles from "./SiblingInformation.module.css";
import {
  siblingsInformationFields,
  siblingFieldsLayout,
} from "./parentInformationFields";
import { renderField } from "../../../utils/renderField";

const SiblingInformation = () => {
  const [values, setValues] = useState({
    fatherName: "",
    mobileNumber: "",
    // add other sibling fields as needed
  });

  const setFieldValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const fieldMap = siblingsInformationFields.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});

  return (
    <div className={styles.siblingInformationWrapper}>
      {siblingFieldsLayout.map((row) => (
        <div key={row.id} className={styles.clgAppSalerow}>
          {row.fields.map((fname) => (
            <div key={fname} className={styles.clgAppSaleFieldCell}>
              {renderField(fname, fieldMap, {
                value: values[fname] ?? "",
                onChange: (e) => setFieldValue(fname, e.target.value),
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SiblingInformation;
