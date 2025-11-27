import React from "react";
import styles from "../CollegeSaleForm/CollegeSaleForm.module.css";

import ApplicationSaleDetails from "../../components/CollegSaleFormComponents/ApplicationDetails/ApplicationSaleDetails";
import PersonalInformation from "../../components/CollegSaleFormComponents/PersonalInformation/PersonalInformation";
import ParentInformationForSchool from "../../components/CollegSaleFormComponents/ParentInformation/ParentInformationForSchool";
import OrientationInformation from "../../components/CollegSaleFormComponents/OrientationInformation/OrientaionInformation";
import AddressInformation from "../../components/CollegSaleFormComponents/AddressInformation/AddressInformation";
import ConcessionInformation from "../../components/CollegSaleFormComponents/ConcessionInformation/ConcessionInformation";
import ExtraConcession from "../../components/CollegSaleFormComponents/ExtraConcession/ExtraConcession";
import AcademicInformation from "../../components/CollegSaleFormComponents/AcademicInformation/AcademicInformation";

import leftArrowBlueColor from "../../assets/leftArrowBlueColor";
import applicationSaleicon from "../../assets/applicationSaleicon";
import Button from "../../widgets/Button/Button";

const CollegeFastSale= () => {
  return (
    <div className={styles.clgSalePageWrapper}>
      <ApplicationSaleDetails />
      <div className={styles.clgAppSaleFormMiddleSection}>
        <PersonalInformation />
        <ParentInformationForSchool />
        <OrientationInformation />
        <AddressInformation />
      </div>
      <div className={styles.clgAppSaleButtonsWrapper}>
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
    </div>
  );
};

export default CollegeFastSale;
