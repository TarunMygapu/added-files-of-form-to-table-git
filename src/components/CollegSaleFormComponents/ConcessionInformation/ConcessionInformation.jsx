import React, { useState, useMemo } from "react";
import styles from "./ConcessionInformation.module.css";

import { useGetEmployeesForSale } from "../../../queires/saleApis/clgSaleApis";

import {
  concessionInformationFields,
  concessionInformationFieldsLayout,
} from "./concessionInformtionFields";

import { renderField } from "../../../utils/renderField";
import {toTitleCase} from "../../../utils/toTitleCase";

const ConcessionInformation = () => {
  const [values, setValues] = useState({});

  /* -------------------------
      API: Get Employees
  ------------------------- */
  const { data: employeesRaw = [] } = useGetEmployeesForSale();
  console.log("Employees: ",employeesRaw);
  /* -------------------------
      Dropdown options
  ------------------------- */
  const employeeOptions = useMemo(
    () => employeesRaw.map((e) => toTitleCase(e?.name ?? "")), // adjust key if needed
    [employeesRaw]
  );

  /* -------------------------
      Update field values
  ------------------------- */
  const setFieldValue = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* -------------------------
      Build final field map
  ------------------------- */
  const fieldMap = useMemo(() => {
    const map = {};

    concessionInformationFields.forEach((f) => {
      map[f.name] = { ...f };

      // Replace dropdowns
      if (f.name === "referredBy") map[f.name].options = employeeOptions;
      if (f.name === "authorizedBy") map[f.name].options = employeeOptions;
    });

    return map;
  }, [employeeOptions]);

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
                  onChange: (e) => setFieldValue(fname, e.target.value),
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
