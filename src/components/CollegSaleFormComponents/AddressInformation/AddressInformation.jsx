import React, {useState} from "react";
import styles from "./AddressInformation.module.css";

import {
  addressInformationFields,
  addressInformationFieldsLayout
} from "./addressInformationFields";

import { renderField } from "../../../utils/renderField";

const AddressInformation = () => {
     const [values, setValues] = useState({
    academicYear: "",
    branchName: "",
  });

  const setFieldValue = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Create field map for fast lookup
  const fieldMap = addressInformationFields.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});

  return (
    <div className={styles.clgAppSaleAddressInfoWrapper}>
      <div className={styles.clgAppSaleAddressInfoTop}>
        <p className={styles.clgAppSaleAddressHeading}>
          Address Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleAddressInfoBottom}>
        {addressInformationFieldsLayout.map((row) => (
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

export default AddressInformation;