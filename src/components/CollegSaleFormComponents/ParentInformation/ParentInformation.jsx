import React, { useState } from "react";
import { useFormikContext } from "formik";
import styles from "./ParentInformation.module.css";

import {
  parentInfoFields,
  parentInfoFieldsLayout,
} from "./parentInformationFields";

import SiblingInformation from "./SiblingInformation";
import { renderField } from "../../../utils/renderField";

import Button from "../../../widgets/Button/Button";
import uploadAnnexureIcon from "../../../assets/uploadAnnexureIcon";
import plusIconBlueColor from "../../../assets/plusIconBlueColor";

import { useGetSector, useGetOccupation } from "../../../queires/saleApis/clgSaleApis";

const ParentInformation = () => {
 const { values, setFieldValue, errors, touched } = useFormikContext();
  const [showSibling, setShowSibling] = useState(false);

  const { data: sectorData } = useGetSector();
  const { data: occupationData } = useGetOccupation();

  // Build field map dynamically
  const fieldMap = parentInfoFields.reduce((acc, f) => {
    let field = { ...f };

    // populate dropdowns for father & mother
    if (f.name.includes("Sector"))
      field.options = sectorData?.data?.map((s) => s.name) || [];

    if (f.name.includes("Occupation"))
      field.options = occupationData?.data?.map((o) => o.name) || [];

    acc[f.name] = field;
    return acc;
  }, {});

  // 💥 Check father Other condition
  const showFatherOther =
    values.fatherSector === "Others" && values.fatherOccupation === "Others";

  if (!showFatherOther && values.fatherOther) {
    setFieldValue("fatherOther", "");
  }

  // 💥 Check mother Other condition
  const showMotherOther =
    values.motherSector === "Others" && values.motherOccupation === "Others";

  if (!showMotherOther && values.motherOther) {
    setFieldValue("motherOther", "");
  }

  // 💥 Build dynamic layout
  const dynamicLayout = [
    {
      id: "row1",
      fields: ["fatherName", "fatherMobile", "fatherEmail"],
    },

    {
      id: "row2",
      fields: showFatherOther
        ? ["fatherSector", "fatherOccupation", "fatherOther"]
        : ["fatherSector", "fatherOccupation",""],
    },

    {
      id: "row3",
      fields: ["motherName", "motherMobile", "motherEmail"],
    },

    {
      id: "row4",
      fields: showMotherOther
        ? ["motherSector", "motherOccupation", "motherOther"]
        : ["motherSector", "motherOccupation",""],
    },

    showSibling ? { id: "rowSibling", fields: [] } : null,
  ].filter(Boolean);


  return (
    <div className={styles.clgAppSalePersonalInforWrapper}>
      <div className={styles.clgAppSaleParentsInfoTop}>
        <p className={styles.clgAppSaleParentsHeading}>Parent Information</p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleParentInfoBottom}>

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

        {/* Sibling Info */}
        {showSibling && <SiblingInformation />}

        {/* Buttons */}
        <div className={styles.clgAppSalerow}>
          <div className={styles.clgAppSaleFieldCell}>
            <Button
              buttonname="Upload Annexure"
              variant="upload"
              lefticon={uploadAnnexureIcon}
              width="196px"
            />
          </div>

          <div className={styles.clgAppSaleFieldCell}>
            <Button
              buttonname={
                showSibling ? "Add Another Sibling" : "Add Sibling"
              }
              variant="secondaryWithExtraPadding"
              lefticon={plusIconBlueColor}
              width={showSibling ? "240px" : "194px"}
              onClick={() => setShowSibling(true)}
            />
          </div>

          <div className={styles.clgAppSaleFieldCell}></div>
        </div>
      </div>
    </div>
  );
};

export default ParentInformation;
