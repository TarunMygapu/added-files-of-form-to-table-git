import React from "react";
import { useFormikContext } from "formik";
import styles from "./PersonalInformation.module.css";

import {
  personalInfoFields,
  personalInfoFastSaleFieldsLayout,
} from "./personalInformationFields";

import UploadPicture from "../../../widgets/UploadPicture/UploadPicture";
import { renderField } from "../../../utils/renderField";

// API Hooks
import {
  useGetQuota,
  useGetEmployeesForSale,
  useGetAdmissionType,
} from "../../../queires/saleApis/clgSaleApis";

import {toTitleCase} from "../../../utils/toTitleCase";

const PersonalInformationClgFastSale = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  // ============ API DATA FETCH ============ //
  const { data: quotaData } = useGetQuota();
  const { data: employeesData } = useGetEmployeesForSale();
  const { data: admissionData } = useGetAdmissionType();

  // ============ BUILD FIELD MAP ============ //
  const fieldMap = personalInfoFields.reduce((acc, f) => {
    let field = { ...f };

    if (f.name === "quotaAdmissionReferredBy") {
      field.options = quotaData?.map((q) => q.name) || [];
    }

    if (f.name === "employeeId") {
      field.options = employeesData?.map((emp) => toTitleCase(emp.name)) || [];
    }

    if (f.name === "admissionType") {
      field.options = admissionData?.map((a) => toTitleCase(a.name)) || [];
    }

    acc[f.name] = field;
    return acc;
  }, {});

  // ============ STAFF LOGIC ============ //
  const isStaff =
    values.quotaAdmissionReferredBy === "Staff" ||
    values.quotaAdmissionReferredBy === "Staff children";

  // Clean up employeeId if not Staff
  if (!isStaff && values.employeeId) {
    setFieldValue("employeeId", "");
  }

  // ============ DYNAMIC LAYOUT LOGIC ============ //
  const dynamicLayout = [
    personalInfoFastSaleFieldsLayout[0], // row1
    personalInfoFastSaleFieldsLayout[1], // row2
    personalInfoFastSaleFieldsLayout[2], // row3

    // row4 dynamic
    isStaff
      ? { id: "row4", fields: ["employeeId", "admissionType"] }
      : { id: "row4", fields: ["admissionType", "", ""] },
  ];

  return (
    <div className={styles.clgAppSalePersonalInforWrapper}>
      {/* Header */}
      <div className={styles.clgAppSalePersonalInfoTop}>
        <p className={styles.clgAppSalePersonalInfoHeading}>
          Personal Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      {/* Form Fields */}
      <div className={styles.clgAppSalePersonalInfoBottom}>
        {dynamicLayout.map((row) => (
          <div key={row.id} className={styles.clgAppSalerow}>
            {row.fields.map((fname) => (
              <div key={fname} className={styles.clgAppSaleFieldCell}>
                {fname &&
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

      {/* Upload Photo */}
      <div className={styles.clgAppSaleUploadPictureWrapper}>
        <UploadPicture />
      </div>
    </div>
  );
};

export default PersonalInformationClgFastSale;
