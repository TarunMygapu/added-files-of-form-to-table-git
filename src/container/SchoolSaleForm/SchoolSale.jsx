import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SchoolSale.module.css";
import ApplicationSaleDetails from "../../components/CollegSaleFormComponents/ApplicationDetails/ApplicationSaleDetails";
import Button from "../../widgets/Button/Button";
import leftArrowBlueColor from "../../assets/leftArrowBlueColor";
import applicationSaleicon from "../../assets/applicationSaleicon";
import PersonalInformationForSchool from "../../components/CollegSaleFormComponents/PersonalInformation/PersnoalInformationForSchool";
import ParentInformationForSchool from "../../components/CollegSaleFormComponents/ParentInformation/ParentInformationForSchool";
import OrientationInformationForSchool from "../../components/CollegSaleFormComponents/OrientationInformation/OrientationInformationForSchool";
import AddressInformation from "../../components/CollegSaleFormComponents/AddressInformation/AddressInformation";

const SchoolSale = () => {
  const location = useLocation();
  const { applicationData } = location.state || {};

  return (
    <div className={styles.clgSalePageWrapper}>
      <ApplicationSaleDetails data={applicationData} />
      <div className={styles.clgAppSaleFormMiddleSection}>
        <PersonalInformationForSchool />
        <ParentInformationForSchool />
        <OrientationInformationForSchool />
        <AddressInformation />
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
  )
}

export default SchoolSale;