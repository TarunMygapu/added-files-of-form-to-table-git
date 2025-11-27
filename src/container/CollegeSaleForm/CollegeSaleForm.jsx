import React from "react";
import styles from "./CollegeSaleForm.module.css";

import ApplicationSaleDetails from "../../CollegSaleFormComponents/ApplicationDetails/ApplicationSaleDetails";
import PersonalInformation from "../../CollegSaleFormComponents/PersonalInformation/PersonalInformation";
import ParentInformation from "../../CollegSaleFormComponents/ParentInformation/ParentInformation";
import OrientationInformation from "../../CollegSaleFormComponents/OrientationInformation/OrientaionInformation";
import AddressInformation from "../../CollegSaleFormComponents/AddressInformation/AddressInformation";
import ConcessionInformation from "../../CollegSaleFormComponents/ConcessionInformation/ConcessionInformation";
import ExtraConcession from "../../CollegSaleFormComponents/ExtraConcession/ExtraConcession";
import AcademicInformation from "../../CollegSaleFormComponents/AcademicInformation/AcademicInformation";

import leftArrowBlueColor from "../../assets/leftArrowBlueColor";
import applicationSaleicon from "../../assets/applicationSaleicon";
import Button from "../../widgets/Button/Button";

const CollegeSalePage = () => {
  return (
    <div className={styles.clgSalePageWrapper}>
      <ApplicationSaleDetails />
      <div className={styles.clgAppSaleFormMiddleSection}>
        <PersonalInformation />
        <ParentInformation />
        <OrientationInformation />
        <AcademicInformation/>
        <AddressInformation />
        <ConcessionInformation /> 
        <ExtraConcession/>
      </div>
      <div className={styles.clgAppSaleButtons}>
        <Button
        buttonname={"Back"}
        variant={"secondaryWithExtraPadding"}
        lefticon={leftArrowBlueColor}
        />
        <Button
        buttonname={"Application Sale"}
        variant={"primary"}
        type={"submit"}
        lefticon={applicationSaleicon}
        />
      </div>
    </div>
  );
};

export default CollegeSalePage;
