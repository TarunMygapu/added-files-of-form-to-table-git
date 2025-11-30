import React from "react";
import { useFormikContext } from "formik";
import styles from "./PersonalInformation.module.css";

import {
  personalInfoFields,
  personalInfoFieldsLayout,
} from "./personalInformationFields";

import UploadPicture from "../../../widgets/UploadPicture/UploadPicture";
import { renderField } from "../../../utils/renderField";
import {toTitleCase} from "../../../utils/toTitleCase";

// API Hooks
import {
  useGetQuota,
  useGetEmployeesForSale,
  useGetAdmissionType,
  useGetFoodType,
  useGetCaste,
  useGetReligion,
  useGetBloodGroup,
} from "../../../queires/saleApis/clgSaleApis";

const PersonalInformation = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  // Fetch dropdown data
  const { data: quotaData } = useGetQuota();
  const { data: employeesData } = useGetEmployeesForSale();
  const { data: admissionData } = useGetAdmissionType();
  const { data: foodData } = useGetFoodType();
  const { data: casteData } = useGetCaste();
  const { data: religionData } = useGetReligion();
  const { data: bloodGroupData } = useGetBloodGroup();

  // Build field map with API results
  const fieldMap = personalInfoFields.reduce((acc, f) => {
    let field = { ...f };

    if (f.name === "quotaAdmissionReferredBy")
      field.options = quotaData?.map((q) => q.name) || [];

    if (f.name === "employeeId")
      field.options = employeesData?.map((emp) => toTitleCase(emp.name)) || [];

    if (f.name === "admissionType")
      field.options = admissionData?.map((a) => toTitleCase(a.name)) || [];

    if (f.name === "foodType")
      //  field.options = foodData?.map((f) => toTitleCase(f.name)) || [];
      if (f.name === "caste")
        field.options = casteData?.map((c) => c.name) || [];

    if (f.name === "religion")
      field.options = religionData?.map((r) => toTitleCase(r.name)) || [];

    if (f.name === "bloodGroup")
      field.options = bloodGroupData?.map((b) => b.name) || [];

    acc[f.name] = field;
    return acc;
  }, {});

  const isStaff =
    values.quotaAdmissionReferredBy === "Staff children" ||
    values.quotaAdmissionReferredBy === "Staff";

  // CLEANUP employeeId if not Staff
  if (!isStaff && values.employeeId) {
    setFieldValue("employeeId", "");
  }

  // 🔥 Dynamic layout
  const dynamicLayout = [
    personalInfoFieldsLayout[0], // row1
    personalInfoFieldsLayout[1], // row2
    personalInfoFieldsLayout[2], // row3

    isStaff
      ? { id: "row4", fields: ["employeeId", "admissionType", "foodType"] }
      : { id: "row4", fields: ["admissionType", "foodType", "bloodGroup"] },

    isStaff
      ? { id: "row5", fields: ["bloodGroup", "caste", "religion"] }
      : { id: "row5", fields: ["caste", "religion", ""] }
  ];

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
          <div key={row.id} className={styles.clgAppSalerow}>
            {row.fields.map((fname) => (
              <div key={fname} className={styles.clgAppSaleFieldCell}>
                {renderField(fname, fieldMap, {
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

export default PersonalInformation;
