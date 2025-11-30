import React from "react";
import { useFormikContext } from "formik";
import styles from "./PersonalInformation.module.css";

import {
  personalInfoFields,
  personalInfoFieldsLayoutForSchool,
} from "./personalInformationFields";

import UploadPicture from "../../../widgets/UploadPicture/UploadPicture";
import { renderField } from "../../../utils/renderField";

// API hooks
import {
  useGetQuota,
  useGetEmployeesForSale,
  useGetAdmissionType,
} from "../../../queires/saleApis/clgSaleApis";

const PersonalInformationForSchool = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  /* =======================
     Fetch Dropdown Data
  =========================*/
  const { data: quotaData } = useGetQuota();
  const { data: employeesData } = useGetEmployeesForSale();
  const { data: admissionData } = useGetAdmissionType();

  /* =======================
      Build Field Map
  =========================*/
  const fieldMap = personalInfoFields.reduce((acc, field) => {
    let f = { ...field };

    if (field.name === "quotaAdmissionReferredBy") {
      f.options = quotaData?.map((q) => q.name) || [];
    }

    if (field.name === "employeeId") {
      f.options = employeesData?.map((e) => e.name) || [];
    }

    if (field.name === "admissionType") {
      f.options = admissionData?.map((a) => a.name) || [];
    }

    acc[field.name] = f;
    return acc;
  }, {});

  /* =======================
      Staff Logic
  =========================*/
  const isStaff =
    values.quotaAdmissionReferredBy === "Staff" ||
    values.quotaAdmissionReferredBy === "Staff children";

  // cleanup employeeId if not staff
  if (!isStaff && values.employeeId) {
    setFieldValue("employeeId", "");
  }

  /* =======================
      Admission Type Logic
  =========================*/
  // decide isWithPro first
  const isWithPro = values.admissionType === "With pro";

  // build row4 step-by-step
  let row4;
  // CASE 1: Staff selected + With Pro selected
  // employeeId | admissionType | proReceiptNo
  if (isStaff && isWithPro) {
    row4 = {
      id: "row4",
      fields: ["employeeId", "admissionType", "proReceiptNo"],
    };
  }

  // CASE 2: Staff selected + With Pro NOT selected
  // employeeId | admissionType | ""
  else if (isStaff && !isWithPro) {
    row4 = {
      id: "row4",
      fields: ["employeeId", "admissionType"],
    };
  }

  // CASE 3: Staff NOT selected + With Pro selected
  // admissionType | proReceiptNo
  // (These two fields will now occupy two cells, likely 50% width each)
  else if (!isStaff && isWithPro) {
    row4 = {
      id: "row4",
      // ONLY TWO FIELDS - No empty middle field, as requested.
      fields: ["admissionType", "proReceiptNo"],
    };
  }

  // CASE 4: Staff NOT selected + With Pro NOT selected
  // admissionType | "" | ""
  else {
    row4 = {
      id: "row4",
      fields: ["admissionType", "", ""],
    };
  }

  const staticRows = personalInfoFieldsLayoutForSchool.slice(0, 3);

  const dynamicLayout = [...staticRows, row4];
  return (
    <div className={styles.clgAppSalePersonalInforWrapper}>
      <div className={styles.clgAppSalePersonalInfoTop}>
        <p className={styles.clgAppSalePersonalInfoHeading}>
          Personal Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSalePersonalInfoBottom}>
        {dynamicLayout.map((row) => (
          <div key={row.id} className={styles.schoolRow}>
            {row.fields.map((fname, idx) => (
              <div key={idx} className={styles.schoolCell}>
                {fname !== "" &&
                  renderField(fname, fieldMap, {
                    value: values[fname] ?? "",
                    onChange: (e) => setFieldValue(fname, e.target.value),
                    error: touched[fname] && errors[fname],
                  })}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.clgAppSaleUploadPictureWrapper}>
        <UploadPicture />
      </div>
    </div>
  );
};

export default PersonalInformationForSchool;
