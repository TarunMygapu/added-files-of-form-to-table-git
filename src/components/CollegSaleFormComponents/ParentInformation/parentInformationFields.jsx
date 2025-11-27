import PhoneNumberBox from "../../widgets/PhoneNumber/PhoneNumberBox";
import Button from "../../widgets/Button/Button";

export const parentInfoFields =[
    {
    name: "fatherName",
    label: "Father Name",
    type: "text",
    disabled: false,
    placeholder: "Enter Father Name",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    component: PhoneNumberBox,
  },
  {
    name:"sector",
    label:"Sector",
    options:["Type-1","Type-2"],
  },
 {
    name:"occupation",
    label:"Occupation",
    options:["Type-1","Type-2"],
  },
  {
    name: "motherName",
    label: "Mother Name",
    type: "text",
    disabled: false,
    placeholder: "Enter Mother Name",
  },
  {
    name:"email",
    label: "Email",
    type: "text",
    disabled: false,
    placeholder: "Enter email",
  },
  {
    name:"other",
    label: "Other",
    type: "text",
    disabled: false,
    placeholder: "Enter Other",
  },
];

export const siblingsInformationFields=[
   {
    name: "fullName",
    label: "Full Name",
    type: "text",
    disabled: false,
    placeholder: "Enter Full Name",
  },
   {
    name:"relationType",
    label:"Relation Type",
    options:["Type-1","Type-2"],
  },
   {
    name:"selectClass",
    label:"Select Class",
    options:["Type-1","Type-2"],
  },
   {
    name: "schoolName",
    label: "School Name",
    type: "text",
    disabled: false,
    placeholder: "Enter School Name",
  },
   {
    name:"gender",
    label:"Select Gender",
    options:["Type-1","Type-2"],
  },
]

export const parentInfoFieldsLayout = [
  { id: "row1", fields: ["fatherName", "mobileNumber","email"] },
  { id: "row2", fields: ["sector", "occupation","other"]},
  { id: "row3", fields: ["motherName", "mobileNumber","email"] },
  { id: "row4", fields: ["sector", "occupation","other"] },
];

export const siblingFieldsLayout = [
  {id:"row1", fields:["fullName","relationType","selectClass"]},
  {id:"row2", fields:["schoolName","gender",""]}
]

export const parentInfoFieldsLayoutForSchool = [
  {id:"row1", fields: ["fatherName","mobileNumber",""]}
]