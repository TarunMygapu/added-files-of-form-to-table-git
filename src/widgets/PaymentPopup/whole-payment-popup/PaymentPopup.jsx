import React, { useState } from "react";
import styles from "./PaymentPopup.module.css";
import PopupHeader from "../popup-headerpart/PopupHeader";
import PopupNavTabs from "../popup-navtabs/PopupNavTabs";
import CashForms from "../popup-formspart/CashForms";
import DDForms from "../popup-formspart/DDForms";
import ChequeForms from "../popup-formspart/ChequeForms";
import CardForms from "../popup-formspart/CardForms";
import Button from "../../Button/Button";
import { submitSchoolApplicationSale, mapFormDataToPayload, submitSchoolFastSale, mapFormDataToFastSalePayload, submitSchoolApplicationSaleCreate, mapSchoolApplicationSaleToPayload } from "../../../hooks/school-apis/SchoolSubmissionApi";
import { submitCollegeApplicationConfirmation, mapCollegeFormDataToPayload, submitCollegeApplicationSale, mapCollegeApplicationSaleToPayload } from "../../../hooks/college-apis/CollegeSubmissionApi";

const PaymentPopup = ({ 
  onClose, 
  title, 
  formData: schoolFormData, 
  siblings, 
  detailsObject,
  type = "school", // "school" or "college"
  collegeFormData, // For college: concession form data
  collegeAcademicFormData, // For college: academic form data (orientation info)
  saleType = "regular" // "regular" or "fast"
}) => {
  // Determine button text based on sale type and form type
  const getButtonText = () => {
    if (saleType === "fast") {
      // For college fast sale, show "Finish Fast Sale"
      if (type === "college") {
        return "Finish Fast Sale";
      }
      // For school fast sale, show "Finish Sale"
      return "Finish Sale";
    }
    // For regular sale - both college and school show "Finish Sale"
    return "Finish Sale";
  };

  const buttonText = getButtonText();
  const [activeTab, setActiveTab] = useState("cash");
  const [paymentFormData, setPaymentFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinishSale = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      let payload;
      let response;

      if (type === "college") {
        // Check if it's regular sale (application sale) or confirmation
        if (saleType === "regular") {
          // Map college application sale form data to API payload
          console.log('🔍 ===== COLLEGE APPLICATION SALE DATA BEFORE MAPPING (PaymentPopup) =====');
          console.log('collegeFormData (full form):', collegeFormData);
          console.log('paymentFormData:', paymentFormData);
          console.log('detailsObject:', detailsObject);
          console.log('activeTab:', activeTab);
          console.log('==============================================================');
          
          payload = mapCollegeApplicationSaleToPayload(
            collegeFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING COLLEGE APPLICATION SALE PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - firstName:", payload.firstName);
          console.log("  - lastName:", payload.lastName);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - classId:", payload.classId);
          console.log("  - Siblings count:", payload.siblings?.length || 0);
          console.log("  - Concessions count:", payload.concessions?.length || 0);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to college application sale API
          response = await submitCollegeApplicationSale(payload);
        } else {
          // Map college confirmation form data to API payload
          console.log('🔍 ===== COLLEGE CONFIRMATION DATA BEFORE MAPPING (PaymentPopup) =====');
          console.log('collegeFormData:', collegeFormData);
          console.log('collegeAcademicFormData:', collegeAcademicFormData);
          console.log('paymentFormData:', paymentFormData);
          console.log('detailsObject:', detailsObject);
          console.log('activeTab:', activeTab);
          console.log('==============================================================');
          
          payload = mapCollegeFormDataToPayload(
            collegeFormData || {},
            collegeAcademicFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING COLLEGE CONFIRMATION PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - joiningClassId:", payload.joiningClassId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - studentTypeId:", payload.studentTypeId);
          console.log("  - cityId:", payload.cityId);
          console.log("  - courseNameId:", payload.courseNameId);
          console.log("  - Concessions count:", payload.concessions?.length || 0);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to college confirmation API
          response = await submitCollegeApplicationConfirmation(payload);
        }
      } else {
        // Check if it's fast sale
        if (saleType === "fast") {
          // Map school form data to fast sale API payload
          payload = mapFormDataToFastSalePayload(
            schoolFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING SCHOOL FAST SALE PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - firstName:", payload.firstName);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - classId:", payload.classId);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to fast sale API
          response = await submitSchoolFastSale(payload);
        } else {
          // Map school form data to create API payload (simpler structure)
          payload = mapSchoolApplicationSaleToPayload(
            schoolFormData || {},
            paymentFormData,
            detailsObject || {},
            activeTab
          );

          // Log the complete payload object to console in a readable format
          console.log("===========================================");
          console.log("📤 SUBMITTING SCHOOL APPLICATION SALE CREATE PAYLOAD TO BACKEND");
          console.log("===========================================");
          console.log("📋 Complete Payload Object:");
          console.log(payload);
          console.log("===========================================");
          console.log("📄 Payload as JSON (formatted):");
          console.log(JSON.stringify(payload, null, 2));
          console.log("===========================================");
          console.log("📊 Payload Summary:");
          console.log("  - studAdmsNo:", payload.studAdmsNo);
          console.log("  - firstName:", payload.firstName);
          console.log("  - lastName:", payload.lastName);
          console.log("  - genderId:", payload.genderId);
          console.log("  - academicYearId:", payload.academicYearId);
          console.log("  - branchId:", payload.branchId);
          console.log("  - classId:", payload.classId);
          console.log("  - orientationId:", payload.orientationId);
          console.log("  - Payment Mode ID:", payload.paymentDetails?.paymentModeId);
          console.log("  - Payment Amount:", payload.paymentDetails?.amount);
          console.log("===========================================");

          // Submit to school application sale create API
          response = await submitSchoolApplicationSaleCreate(payload);
        }
      }
      
      console.log("✅ Submission successful:", response);
      setSubmitSuccess(true);
      
      // Close popup after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setSubmitError(error.response?.data?.message || error.message || "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCashFinishSale = () => {
    handleFinishSale();
  };

  const handleCardFinishSale = () => {
    handleFinishSale();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <PopupHeader step={3} onClose={onClose} title={title} />

        <PopupNavTabs onChange={handleTabChange} />

        <div className={styles.modalContent}>
          {submitError && (
            <div style={{ padding: '10px', margin: '10px', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
              Error: {submitError}
            </div>
          )}
          {submitSuccess && (
            <div style={{ padding: '10px', margin: '10px', backgroundColor: '#efe', color: '#0c0', borderRadius: '4px' }}>
              Success! Form submitted successfully.
            </div>
          )}

          {activeTab === "cash" && (
            <CashForms formData={paymentFormData} onChange={handleFormChange} />
          )}

          {activeTab === "dd" && (
            <>
              <DDForms formData={paymentFormData} onChange={handleFormChange} />
              <div className={styles.footer}>
                <Button
                  buttonname={isSubmitting ? "Submitting..." : buttonText}
                  righticon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10H16M16 10L10 4M16 10L10 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  variant="primary"
                  onClick={handleFinishSale}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {activeTab === "cheque" && (
            <>
              <ChequeForms formData={paymentFormData} onChange={handleFormChange} />
              <div className={styles.footer}>
                <Button
                  buttonname={isSubmitting ? "Submitting..." : buttonText}
                  righticon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 10H16M16 10L10 4M16 10L10 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  variant="primary"
                  onClick={handleFinishSale}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {activeTab === "card" && (
            <CardForms formData={paymentFormData} onChange={handleFormChange} />
          )}
        </div>

        {activeTab === "cash" && (
          <div className={styles.footer}>
            <Button
              buttonname={isSubmitting ? "Submitting..." : buttonText}
              righticon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H16M16 10L10 4M16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              variant="primary"
              onClick={handleCashFinishSale}
              disabled={isSubmitting}
            />
          </div>
        )}

        {activeTab === "card" && (
          <div className={styles.footer}>
            <Button
              buttonname={isSubmitting ? "Submitting..." : buttonText}
              righticon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H16M16 10L10 4M16 10L10 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              variant="primary"
              onClick={handleCardFinishSale}
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPopup;
