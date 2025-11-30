import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom";
import clgActualSaleValidationSchema from "../../components/CollegSaleFormComponents/CollegeActualSaleValidationSchema";

import styles from "./CollegeSaleForm.module.css";

import ApplicationSaleDetails from "../../components/CollegSaleFormComponents/ApplicationDetails/ApplicationSaleDetails";
import PersonalInformation from "../../components/CollegSaleFormComponents/PersonalInformation/PersonalInformation";
import ParentInformation from "../../components/CollegSaleFormComponents/ParentInformation/ParentInformation";
import OrientationInformation from "../../components/CollegSaleFormComponents/OrientationInformation/OrientaionInformation";
import AddressInformation from "../../components/CollegSaleFormComponents/AddressInformation/AddressInformation";
import ConcessionInformation from "../../components/CollegSaleFormComponents/ConcessionInformation/ConcessionInformation";
import ExtraConcession from "../../components/CollegSaleFormComponents/ExtraConcession/ExtraConcession";
import AcademicInformation from "../../components/CollegSaleFormComponents/AcademicInformation/AcademicInformation";
import PaymentPopup from "../../widgets/PaymentPopup/whole-payment-popup/PaymentPopup.jsx";

import leftArrowBlueColor from "../../assets/leftArrowBlueColor";
import applicationSaleicon from "../../assets/applicationSaleicon";
import Button from "../../widgets/Button/Button";
import Popup from "../../widgets/Popup/Popup";

const CollegeSalePage = () => {
  const location = useLocation();
  const applicationData = location.state?.applicationData;
  const [joiningClass, setJoiningClass] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [academicFormValues, setAcademicFormValues] = useState(null);
  
  // State to store data from ApplicationSaleDetails
  const [applicationDetailsData, setApplicationDetailsData] = useState(null);

  // All form fields initial values
  const initialValues = {
    firstName: "",
    surName: "",
    gender: "",
    aaparNo: "",
    dob: "",
    aadharCardNo: "",
    quotaAdmissionReferredBy: "",
    employeeId: "",
    admissionType: "",

    // Parent Information
    fatherName: "",
    mobileNumber: "",
    email: "",
    sector: "",
    occupation: "",
    other: "",
    motherName: "",

    // Orientation
    academicYear: "",
    branchName: "",
    branchType: "",
    orientationName: "",
    city: "",

    // Academic
    hallTicketNo: "",
    schoolState: "",
    schoolDistrict: "",
    schoolType: "",
    schoolName: "",
    tenthHallTicketNo: "",
    interFirstYearHallTicketNo: "",
    interHallTicketNo: "",
    clgState: "",
    clgDistrict: "",
    clgType: "",
    collegeName: "",
    scoreAppNo: "",
    scoreMarks: "",
    foodType: "",
    bloodGroup: "",
    caste: "",
    religion: "",

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

    // Concession
    firstYearConcession: "",
    secondYearConcession: "",
    referredBy: "",
    description: "",
    authorizedBy: "",
    concessionReason: "",

    siblings: []
  };

  // API Call Function (Will replace placeholder)
  const handleSubmitAPI = async (values) => {
    console.log("📤 Final Submit API Payload:", values);

    // TODO: Replace this with your actual POST API call
    alert("API submitted successfully!");
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={clgActualSaleValidationSchema()}
      onSubmit={(values) => {
        // Popup YES triggers actual POST
        handleSubmitAPI(values);
      }}
    >
      {(formik) => (
        <Form className={styles.clgSalePageWrapper}>
          <ApplicationSaleDetails 
            saleName={"Sale"}
            onDataLoaded={(data) => {
              setApplicationDetailsData(data);
              // Pre-populate Formik values if not already set
              if (data.academicYear && !formik.values.academicYear) {
                formik.setFieldValue("academicYear", data.academicYear);
              }
              if (data.campusName && !formik.values.campusName) {
                formik.setFieldValue("campusName", data.campusName);
              }
            }}
          />

          <div className={styles.clgAppSaleFormMiddleSection}>
            <PersonalInformation />
            <ParentInformation />
            <OrientationInformation
              initialAcademicYear={applicationDetailsData?.academicYear}
              initialAcademicYearId={applicationDetailsData?.academicYearId}
              initialCampusName={applicationDetailsData?.campusName}
              initialCampusId={applicationDetailsData?.campusId}
            />
            <AcademicInformation joiningClass={formik.values.joiningClass} />
            <AddressInformation />
            <ConcessionInformation />
            <ExtraConcession />
          </div>

          <div className={styles.clgAppSaleButtons}>
            <Button
              buttonname={"Back"}
              variant={"secondaryWithExtraPadding"}
              lefticon={leftArrowBlueColor}
              type="button"
            />

            {/* Application Sale Trigger */}
            <Button
              buttonname={"Application Sale"}
              variant={"primary"}
              lefticon={applicationSaleicon}
              type="button"
              onClick={() => {
                // Store all form values
                const values = formik.values;
                
                // Separate concession data (collegeFormData)
                const concessionData = {
                  firstYearConcession: values.firstYearConcession || "",
                  secondYearConcession: values.secondYearConcession || "",
                  referredBy: values.referredBy || "",
                  description: values.description || "",
                  authorizedBy: values.authorizedBy || "",
                  concessionReason: values.concessionReason || "",
                };
                
                // Separate academic/orientation data (collegeAcademicFormData)
                const academicData = {
                  academicYear: values.academicYear || "",
                  branchName: values.branchName || "",
                  branchType: values.branchType || "",
                  orientationName: values.orientationName || "",
                  city: values.city || "",
                  joiningClass: values.joiningClass || "",
                };
                
                // Store all form data for college application sale
                setFormValues(values);
                setAcademicFormValues(academicData);
                
                // Open payment popup (validation will be handled in the popup if needed)
                setShowPaymentPopup(true);
              }}
            />
          </div>

          {/* POPUP */}
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onConfirm={() => {
              setIsPopupOpen(false);
              formik.handleSubmit(); // triggers POST API
            }}
          />
        </Form>
      )}
    </Formik>

    {/* Payment Popup */}
    {showPaymentPopup && (
      <PaymentPopup
        onClose={() => setShowPaymentPopup(false)}
        title="Complete Application Sale & Confirmation"
        formData={formValues || {}}
        siblings={formValues?.siblings || []}
        detailsObject={applicationData}
        type="college"
        collegeFormData={formValues}
        collegeAcademicFormData={academicFormValues}
        saleType="regular"
      />
    )}
    </>
  );
};

export default CollegeSalePage;
