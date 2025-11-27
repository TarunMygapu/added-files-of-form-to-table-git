import React, { useState } from "react";
import styles from "./OrientationInformation.module.css";

import {
  orientationInfoFieldsForSchool,
  orientationInfoFieldsLayoutForSchool
} from "./orientationFieldsForSchool";

import { renderField } from "../../../utils/renderField";

const OrientationInformationForSchool = () => {

  // Local state for all fields (add more fields as needed)
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
  const fieldMap = orientationInfoFieldsForSchool.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});

  return (
    <div className={styles.clgAppSaleOrientationWrapper}>
      <div className={styles.clgAppSaleOrientationInfoTop}>
        <p className={styles.clgAppSaleOrientationHeading}>
          Orientation Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleOrientationInfoBottom}>
        {orientationInfoFieldsLayoutForSchool.map((row) => (
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

export default OrientationInformationForSchool;
