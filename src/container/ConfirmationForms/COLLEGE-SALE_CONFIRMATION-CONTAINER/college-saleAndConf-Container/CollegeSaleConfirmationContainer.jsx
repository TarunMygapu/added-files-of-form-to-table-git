import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CollegeOverviewContainer from "../college-overview-container/CollegeOverviewContainer";
import CollegeAppConfContainer from "../college-app_conf-container/CollegeAppConfContainer";
import CollegePaymentPopup from "../college-payment-popup-container/CollegePaymentPopup";
import { useAdmissionSaleData, useCollegeOverviewData } from "../../../../hooks/college-apis/CollegeOverviewApis";

const CollegeSaleConfirmationContainer = () => {
  const location = useLocation();
  const applicationData = location.state?.applicationData;
  
  // Get applicationNo from navigation state - no hardcoded fallback
  const applicationNo = applicationData?.applicationNo;
  
  const [currentStep, setCurrentStep] = useState(1); // 1 = Overview, 2 = Application Confirmation
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  
  // State to store form data and academic form data for submission
  const [formData, setFormData] = useState(null);
  const [academicFormData, setAcademicFormData] = useState(null);

  // Fetch data once at parent level - using dynamic applicationNo
  const { data: detailsObject } = useAdmissionSaleData(applicationNo);
  const { overviewData } = useCollegeOverviewData(applicationNo);

  // Show error if applicationNo is not available
  if (!applicationNo) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ color: 'red', fontSize: '18px', marginBottom: '10px' }}>
          Error: Application number is required
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Please navigate from the Application Status table to access this page.
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleProceedToPayment = (formDataFromChild, academicFormDataFromChild) => {
    // Store form data and academic form data when proceeding to payment
    setFormData(formDataFromChild);
    setAcademicFormData(academicFormDataFromChild);
    setShowPaymentPopup(true);
  };

  const handleClosePayment = () => {
    setShowPaymentPopup(false);
  };

  return (
    <div>
      <div>
        {currentStep === 1 && (
          <CollegeOverviewContainer 
            onNext={handleNext} 
            onEdit={handleEdit}
            detailsObject={detailsObject}
            overviewData={overviewData}
          />
        )}

        {currentStep === 2 && (
          <CollegeAppConfContainer
            onBack={handleBack}
            onProceedToPayment={handleProceedToPayment}
            detailsObject={detailsObject}
            overviewData={overviewData}
          />
        )}
      </div>

      {showPaymentPopup && (
        <CollegePaymentPopup 
          onClose={handleClosePayment}
          formData={formData}
          academicFormData={academicFormData}
          detailsObject={detailsObject}
        />
      )}
    </div>
  );
};

export default CollegeSaleConfirmationContainer;
