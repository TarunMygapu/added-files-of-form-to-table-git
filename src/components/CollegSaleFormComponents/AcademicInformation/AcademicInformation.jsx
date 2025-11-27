import React, {useState} from "react";
import styles from "./AcademicInformation.module.css"

import { academicInformationFields,academicInformationFieldsLayout } from "./acedemicInformationFields";
import { renderField } from "../../../utils/renderField";

const AcademicInformation =() =>{
    
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
  const fieldMap = academicInformationFields.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});

  return (
    <div className={styles.clgAppSaleAcademicInfoWrapper}>
      <div className={styles.clgAppSaleAcademicInfoTop}>
        <p className={styles.clgAppSaleAcademicHeading}>
          Academic Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleAcademicInfoBottom}>
        {academicInformationFieldsLayout.map((row) => (
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

export default AcademicInformation;