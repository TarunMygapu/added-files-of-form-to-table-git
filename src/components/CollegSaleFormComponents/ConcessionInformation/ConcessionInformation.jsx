import React, {useState} from "react";
import styles from "./ConcessionInformation.module.css";

import {concessionInformationFields,concessionInformationFieldsLayout} from "./concessionInformtionFields"
import { renderField } from "../../../utils/renderField";

const ConcessionInformation = () => {
     const [values, setValues] = useState({
    academicYear: "",
    branchName: "",
    branchType: "",
  });

  const setFieldValue = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Create field map for fast lookup
  const fieldMap = concessionInformationFields.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});

  return (
    <div className={styles.clgAppSaleConcessionInfoWrapper}>
      <div className={styles.clgAppSaleConcessionInfoTop}>
        <p className={styles.clgAppSaleConcessionHeading}>
          Concession Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleConcessionInfoBottom}>
        {concessionInformationFieldsLayout.map((row) => (
          <div key={row.id} className={styles.clgAppSalerow}>
            {row.fields.map((fname) => (
              <div key={fname} className={styles.clgAppSaleFieldCell}>
                {renderField(fname, fieldMap, {
                  value: values[fname],
                  onChange: (e) => setFieldValue(fname, e.target.value)
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};


export default ConcessionInformation;