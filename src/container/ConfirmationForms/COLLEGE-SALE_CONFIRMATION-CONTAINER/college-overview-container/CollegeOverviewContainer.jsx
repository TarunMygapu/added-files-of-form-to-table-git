import React from "react";
import CollegeOverviewPersonalInfo from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-personal-info/CollegeOverviewPersonalInfo.jsx";
import CollegeOverviewParentInfo from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-parent-info/CollegeOverviewParentInfo.jsx";
import CollegeOverviewSiblingInfo from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-sibling-info/CollegeOverviewSiblingInfo.jsx";
import CollegeOverviewOrientInfo from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-orientation-info/CollegeOverviewOrientInfo.jsx";
import CollegeOverviewAddressInfo from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-address-info/CollegeOverviewAddressInfo.jsx";
import CollegeOverviewConceInfo from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-concession-info/CollegeOverviewConceInfo.jsx";
import CollegeOverviewConWrtAppl from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-con-wrtn-appl/CollegeOverviewConWrtAppl.jsx";
import ApplicationSaleAndConfTopSec from "../../../../widgets/ApplicationSaleAndConTopSection/ApplicationSaleAndConfTopSec.jsx";
import Button from "../../../../widgets/Button/Button";
import styles from "./CollegeOverviewContainer.module.css";
import EditIcon from "../../../../assets/school-sale-conf-assets/EditIcon";
import ButtonRightArrow from "../../../../assets/school-sale-conf-assets/ButtonRightArrow";
import CollegeOverviewAcademicInfo from "../../../../components/ConfirmationFormComponents/COLLEGE-SALE-CONFIRMATION/college-overview-info/college-overview-academic-info/CollegeOverviewAcademicInfo.jsx";

const CollegeOverviewContainer = ({ onNext, onEdit, detailsObject, overviewData }) => {
  return (
    <div className={styles.container}>
      <ApplicationSaleAndConfTopSec
        step={1}
        title="Application Confirmation"
        detailsObject={detailsObject}
      />
      <div className={styles.overviewContainer}>
        <CollegeOverviewPersonalInfo data={overviewData} />
        <CollegeOverviewParentInfo data={overviewData} />
        <CollegeOverviewSiblingInfo siblingsData={overviewData?.siblings} />
        <CollegeOverviewOrientInfo data={overviewData} />
        <CollegeOverviewAcademicInfo data={overviewData} />
        <CollegeOverviewAddressInfo data={overviewData} />
        <CollegeOverviewConceInfo concessionsData={overviewData?.concessions} />
        <CollegeOverviewConWrtAppl data={overviewData} />
      </div>
      {/* Bottom Action Buttons */}
      <div className={styles.bottomActions}>
        <Button
          buttonname="Edit"
          variant="secondary"
          onClick={onEdit}
          lefticon={<EditIcon />}
        />
        <Button
          buttonname="Next"
          righticon={<ButtonRightArrow />}
          variant="primary"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default CollegeOverviewContainer;
