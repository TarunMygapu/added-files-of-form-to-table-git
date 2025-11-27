import React from "react";
import styles from "./PersonalInformation.module.css";
import {
  personalInfoFields,
  personalInfoFieldsLayout,
} from "./personalInformationFields";

import UploadPicture from "../../widgets/UploadPicture/UploadPicture";
import {renderField} from "../../../utils/renderField";

const PersonalInformation = () => {
  const fieldMap = personalInfoFields.reduce((acc, f) => {
    acc[f.name] = f;
    return acc;
  }, {});

  const topTwoRows = personalInfoFieldsLayout.slice(0, 2);
  const remainingRows = personalInfoFieldsLayout.slice(2);

  return (
    <div className={styles.clgAppSalePersonalInforWrapper}>
      <div className={styles.clgAppSalePersonalInfoTop}>
        <p className={styles.clgAppSalePersonalInfoHeading}>
          Personal Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSalePersonalInfoBottom}>
        <div className={styles.clgAppSalePersonalNameAndUploadPic}>
          
          {/* TOP 2 ROWS */}
          <div className={styles.clgAppSaleTopLeftFields}>
            {topTwoRows.map((row) => (
              <div key={row.id} className={styles.clgAppSalerow}>
                {row.fields.map((fname) => (
                  <div key={fname} className={styles.clgAppSaleFieldCell}>
                    {renderField(fname, fieldMap)} {/* FIXED */}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Picture */}
          <div className={styles.clgAppSaleUploadPicture}>
            <UploadPicture />
          </div>
        </div>

        {/* REMAINING ROWS */}
        <div className={styles.clgSalePersonalDetailsBottom}>
          {remainingRows.map((row) => (
            <div key={row.id} className={styles.clgAppSalerow}>
              {row.fields.map((fname) => (
                <div key={fname} className={styles.clgAppSaleFieldCell}>
                  {renderField(fname, fieldMap)} {/* FIXED */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
