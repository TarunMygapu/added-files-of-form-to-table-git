import Gender from "../../../widgets/GenderWidget/Gender";
import DatePicker from "../../../widgets/DateWidgets/DatePicker/DatePicker";

export const personalInfoFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    disabled: false,
    placeholder: "Enter First Name",
  },
  {
    name: "surName",
    label: "Surname / Last Name",
    type: "text",
    disabled: false,
    placeholder: "Enter Surname / Last Name",
  },
  {
    name: "gender",
    label: "Gender",
    component: Gender,
  },
  {
    name: "aaparNo",
    label: "Aapar No",
    type: "text",
    disabled: false,
    placeholder: "Enter Aapar No",
  },
  {
    name: "dob",
    label: "Date of Birth",
    component: DatePicker,
  },
  {
    name: "aadharCardNo",
    label: "Aadhar Card No",
    type: "text",
    disabled: false,
    placeholder: "Enter Aadhar Card No",
  },
  {
    name: "quota/AdmissionReferredBy",
    label: "Quota/Admission Referred By",
    options: ["Staff", "Management", "NRI", "J&K", "Foreign", "Sports", "PH", "Defence", "SC/ST/OBC"],
  },
  {
    name: "employeeId",
    label: "Employee ID",
    options: ["Employee1 - ID1", "Employee2 - ID2", "Employee3 - ID3", "Employee4 - ID4"],
  },
  {
    name: "admissionType",
    label: "Admission Type",
    options: ["With Pro", "Direct Walk-in"],
  },
  {
    name: "proReceiptNo",
    label: "PRO Receipt No",
    type: "text",
    disabled: false,
    placeholder: "Enter PRO Receipt No",
  },
];

export const personalInfoFieldsLayout = [
  { id: "row1", fields: ["firstName", "surName"] },
  { id: "row2", fields: ["gender", "aaparNo"] },
  { id: "row3", fields: ["dob", "aadharCardNo", "quota/AdmissionReferredBy"] },
  { id: "row4", fields: ["employeeId", "admissionType", ""] },
]

export const personalInfoFieldsLayoutForSchool = [
  { id: "row1", fields: ["firstName", "surName"] },
  { id: "row2", fields: ["gender", "aaparNo"] },
  { id: "row3", fields: ["dob", "aadharCardNo", "quota/AdmissionReferredBy"] },
  { id: "row4", fields: ["employeeId", "admissionType", "proReceiptNo"] },
]