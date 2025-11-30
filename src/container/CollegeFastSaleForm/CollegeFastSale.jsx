import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom";
import styles from "../CollegeSaleForm/CollegeSaleForm.module.css";

import ApplicationSaleDetails from "../../components/CollegSaleFormComponents/ApplicationDetails/ApplicationSaleDetails";
import PersonalInformationClgFastSale from "../../components/CollegSaleFormComponents/PersonalInformation/PersonalInformationClgFastSale";
import ParentInformationForSchool from "../../components/CollegSaleFormComponents/ParentInformation/ParentInformationForSchool";
import OrientationInformation from "../../components/CollegSaleFormComponents/OrientationInformation/OrientaionInformation";
import AddressInformation from "../../components/CollegSaleFormComponents/AddressInformation/AddressInformation";
import PaymentPopup from "../../widgets/PaymentPopup/whole-payment-popup/PaymentPopup.jsx";

import leftArrowBlue from "../../assets/leftArrowBlueColor";
import saleIcon from "../../assets/applicationSaleicon";
import Button from "../../widgets/Button/Button";

// INITIAL VALUES
const initialValues = {
  firstName: "",
  surName: "",
  mobileNumber: "",
  email: "",
  // add more fields later
};

const CollegeFastSale = () => {
  const location = useLocation();
  const applicationData = location.state?.applicationData;
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  
  // For college fast sale, use "fast" sale type to show "Finish Fast Sale" button
  const saleType = "fast";

  const handleApplicationFastSale = (formik) => {
    // Store current form values
    setFormValues(formik.values);
    
    // Validate form before opening popup
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setShowPaymentPopup(true);
      } else {
        // Mark all fields as touched to show errors
        formik.setTouched(
          Object.keys(formik.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          )
        );
      }
    });
  };

  const handleClosePayment = () => {
    setShowPaymentPopup(false);
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("FAST SALE SUBMIT:", values);
      }}
    >
      {(formik) => (
        <Form className={styles.clgSalePageWrapper}>
          <ApplicationSaleDetails saleName={"Fast Sale"} />

          <div className={styles.clgAppFastSaleFormMiddleSection}>
            <PersonalInformationClgFastSale />
            <ParentInformationForSchool />
            <OrientationInformation />
            <AddressInformation />
          </div>

          <div className={styles.clgAppSaleButtonsWrapper}>
            <div className={styles.clgAppSaleButtons}>
              <Button
                buttonname={"Back"}
                variant={"secondaryWithExtraPadding"}
                lefticon={leftArrowBlue}
                type="button"
              />

              <Button
                buttonname={"Application Fast Sale"}
                variant={"primary"}
                  type="button"
                lefticon={saleIcon}
                  onClick={() => handleApplicationFastSale(formik)}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <PaymentPopup
          onClose={handleClosePayment}
          title="Complete Application Fast Sale & Confirmation"
          formData={formValues}
          siblings={[]}
          detailsObject={applicationData}
          type="college"
          saleType={saleType}
        />
      )}
    </>
  );
};

export default CollegeFastSale;
