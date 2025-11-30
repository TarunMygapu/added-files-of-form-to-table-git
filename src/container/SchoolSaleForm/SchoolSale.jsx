import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./SchoolSale.module.css";

import ApplicationSaleDetails from "../../components/CollegSaleFormComponents/ApplicationDetails/ApplicationSaleDetails";
import Button from "../../widgets/Button/Button";
import leftArrowBlueColor from "../../assets/leftArrowBlueColor";
import applicationSaleicon from "../../assets/applicationSaleicon";
import rightArrowBlueColor from "../../assets/rightArrowBlueColor";
import PaymentPopup from "../../widgets/PaymentPopup/whole-payment-popup/PaymentPopup.jsx";

import PersonalInformationForSchool from "../../components/CollegSaleFormComponents/PersonalInformation/PersnoalInformationForSchool";
import ParentInformationForSchool from "../../components/CollegSaleFormComponents/ParentInformation/ParentInformationForSchool";
import OrientationInformationForSchool from "../../components/CollegSaleFormComponents/OrientationInformation/OrientationInformationForSchool";
import AddressInformation from "../../components/CollegSaleFormComponents/AddressInformation/AddressInformation";

// ---------------------------------------
// 🟦 Initial Values for School Flow
// ---------------------------------------
const initialValues = {
  // Personal Information
  firstName: "",
  surName: "",
  gender: "",
  aaparNo: "",
  dob: "",
  aadharCardNo: "",
  quotaAdmissionReferredBy: "",
  employeeId: "",
  admissionType: "",
  proReceiptNo:"",

  // Parent Info
  fatherName: "",
  fatherMobile: "",

  // Orientation
  academicYear: "",
  academicYearId: null, // Backend ID for academic year
  branchName: "", // Display name for branch/campus
  campusId: null, // Backend ID for campus/branch
  branchType: "",
  city: "",
  joiningClass: "",
  orientationName: "",
  studentType: "",
  orientationFee: "",

  // Address
  doorNo: "",
  streetName: "",
  landmark: "",
  area: "",
  pincode: "",
  state: "",
  district: "",
  mandal: "",
  cityAddress: "",
  gpin: "",
};

const SchoolSale = () => {
  const location = useLocation();
  const [applicationDetailsData, setApplicationDetailsData] = useState(null);
  const navigate = useNavigate();
  const applicationData = location.state?.applicationData;
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  
  // For school sale "Proceed to Sale" button, use "regular" sale type to show "Finish Sale" button
  const saleType = "regular";

  const handleProceedToSale = (formik) => {
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

  const handleSaleAndConform = (formik) => {
    // Store current form values
    setFormValues(formik.values);
    
    // Validate form before navigating
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        // Navigate to confirmation page with form data and application data
        navigate('/school-application-confirmation', {
          state: {
            applicationData: applicationData,
            formData: formik.values
          }
        });
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
        console.log("📤 School Sale Submit:", values);
        alert("School Sale Submitted!");
      }}
    >
      {(formik) => (
        <Form className={styles.clgSalePageWrapper}>
          {/* -- APPLICATION DETAILS -- */}
          <ApplicationSaleDetails 
            saleName={"Sale"}
            onDataLoaded={(data) => {
              console.log("🏫 SchoolSale - ApplicationSaleDetails data loaded:", data);
              setApplicationDetailsData(data);
              
              // Always set IDs if they exist in the API response (for backend submission)
              if (data.academicYear) {
                console.log("✅ Setting academicYear in Formik:", data.academicYear);
                formik.setFieldValue("academicYear", data.academicYear);
              }
              if (data.academicYearId !== null && data.academicYearId !== undefined) {
                console.log("✅ Setting academicYearId in Formik (for backend):", data.academicYearId);
                formik.setFieldValue("academicYearId", data.academicYearId);
              } else {
                console.warn("⚠️ academicYearId is null/undefined - check API response");
              }
              
              if (data.campusName) {
                console.log("✅ Setting branchName in Formik:", data.campusName);
                formik.setFieldValue("branchName", data.campusName);
              }
              if (data.campusId !== null && data.campusId !== undefined) {
                console.log("✅ Setting campusId in Formik (for backend):", data.campusId);
                formik.setFieldValue("campusId", data.campusId);
              } else {
                console.warn("⚠️ campusId is null/undefined - check API response");
              }
              
              // Log final Formik values to verify IDs are stored
              console.log("📋 Formik values after setting IDs:", {
                academicYear: formik.values.academicYear,
                academicYearId: formik.values.academicYearId,
                branchName: formik.values.branchName,
                campusId: formik.values.campusId
              });
            }}
          />

          {/* -- ALL MIDDLE COMPONENTS -- */}
          <div className={styles.clgAppSaleFormMiddleSection}>
            <PersonalInformationForSchool />
            <ParentInformationForSchool />
            <OrientationInformationForSchool
              initialAcademicYear={applicationDetailsData?.academicYear}
              initialAcademicYearId={applicationDetailsData?.academicYearId}
              initialCampusName={applicationDetailsData?.campusName}
              initialCampusId={applicationDetailsData?.campusId}
              initialCityName={applicationDetailsData?.cityName}
              initialCityId={applicationDetailsData?.cityId}
            />
            <AddressInformation />
          </div>

          {/* -- BUTTONS -- */}
          <div className={styles.clgAppSaleButtons}>
            <Button
              buttonname={"Proceed to Sale"}
              variant={"secondaryWithExtraPadding"}
              righticon={rightArrowBlueColor}
              type="button"
                onClick={() => handleProceedToSale(formik)}
            />

            <Button
              buttonname={"Sale & Conform"}
              variant={"primary"}
              type="button"
              lefticon={applicationSaleicon}
              onClick={() => handleSaleAndConform(formik)}
            />
          </div>
        </Form>
      )}
    </Formik>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <PaymentPopup
          onClose={handleClosePayment}
          title="Complete Application Sale & Confirmation"
          formData={formValues}
          siblings={[]}
          detailsObject={applicationData}
          type="school"
          saleType={saleType}
        />
      )}
    </>
  );
};

export default SchoolSale;
