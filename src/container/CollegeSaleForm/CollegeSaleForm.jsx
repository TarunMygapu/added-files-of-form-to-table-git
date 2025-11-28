import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./CollegeSaleForm.module.css";

import ApplicationSaleDetails from "../../components/CollegSaleFormComponents/ApplicationDetails/ApplicationSaleDetails";
import PersonalInformation from "../../components/CollegSaleFormComponents/PersonalInformation/PersonalInformation";
import ParentInformation from "../../components/CollegSaleFormComponents/ParentInformation/ParentInformation";
import OrientationInformation from "../../components/CollegSaleFormComponents/OrientationInformation/OrientaionInformation";
import AddressInformation from "../../components/CollegSaleFormComponents/AddressInformation/AddressInformation";
import ConcessionInformation from "../../components/CollegSaleFormComponents/ConcessionInformation/ConcessionInformation";
import ExtraConcession from "../../components/CollegSaleFormComponents/ExtraConcession/ExtraConcession";
import AcademicInformation from "../../components/CollegSaleFormComponents/AcademicInformation/AcademicInformation";

import leftArrowBlueColor from "../../assets/leftArrowBlueColor";
import applicationSaleicon from "../../assets/applicationSaleicon";
import Button from "../../widgets/Button/Button";

const CollegeSalePage = () => {
  const location = useLocation();
  const { applicationData } = location.state || {};

  return (
    <div className={styles.clgSalePageWrapper}>
      <ApplicationSaleDetails data={applicationData} />
      <div className={styles.clgAppSaleFormMiddleSection}>
        <PersonalInformation />
        <ParentInformation />
        <OrientationInformation />
        <AcademicInformation />
        <AddressInformation />
        <ConcessionInformation />
        <ExtraConcession />
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
