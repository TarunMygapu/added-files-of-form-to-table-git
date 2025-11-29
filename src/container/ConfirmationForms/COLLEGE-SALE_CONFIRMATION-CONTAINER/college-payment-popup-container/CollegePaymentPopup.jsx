import React from 'react'
import PaymentPopup from '../../../../widgets/PaymentPopup/whole-payment-popup/PaymentPopup.jsx';

const CollegePaymentPopup = ({ onClose, formData, academicFormData, detailsObject }) => {
  return (
    <PaymentPopup 
      onClose={onClose} 
      title="Complete Application Confirmation"
      type="college"
      collegeFormData={formData}
      collegeAcademicFormData={academicFormData}
      detailsObject={detailsObject}
    />
  );
}

export default CollegePaymentPopup
