import React, { useState } from "react";
import styles from "./ParentInformation.module.css";

import {
  parentInfoFields,
  parentInfoFieldsLayout,
} from "./parentInformationFields";

import SiblingInformation from "./SiblingInformation";

import { renderField } from "../../../utils/renderField";
import Button from "../../widgets/Button/Button";
import uploadAnnexureIcon from "../../assets/uploadAnnexureIcon";
import plusIconBlueColor from "../../assets/plusIconBlueColor";

const ParentInformation = () => {
  const [showSibling, setShowSibling] = useState(true);

  const [values, setValues] = useState({
    fatherName: "",
    mobileNumber: "",
  });

  const setFieldValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // Map field name → field config
  const fieldMap = parentInfoFields.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});

  const handleClickSiblingButton = () => {
    // show the sibling section (first click)
    // if you want toggle, use: setShowSibling(prev => !prev);
    setShowSibling(true);
  };

  const addSiblingButtonText = showSibling
    ? "Add Another Sibling"
    : "Add Sibling";

    const buttonWidth = showSibling ? "240px" : "194px";

  return (
    <div className={styles.clgAppSalePersonalInforWrapper}>
      <div className={styles.clgAppSaleParentsInfoTop}>
        <p className={styles.clgAppSaleParentsHeading}>Parent Information</p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleParentInfoBottom}>
        {parentInfoFieldsLayout.map((row) => (
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

        {/* Show sibling section only when button is clicked */}
        {showSibling && <SiblingInformation />}

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
              buttonname={addSiblingButtonText}
              variant="secondaryWithExtraPadding"
              lefticon={plusIconBlueColor}
              width={buttonWidth}
              onClick={handleClickSiblingButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentInformation;
