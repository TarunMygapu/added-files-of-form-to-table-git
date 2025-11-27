
export const concessionInformationFields = [
    {
    name: "1stYearConcession",
    label: "1st Year Concession",
    type: "text",
    disabled: true,
    placeholder: "Enter 1st Year Concession",
  },
   {
    name: "2ndYearConcession",
    label: "2nd Year Concession",
    type: "text",
    disabled: true,
    placeholder: "Enter 2nd Year Concession",
  },
  {
    name:"referredBy",
    label:"Referred By",
    options:["Type-1","Type-2"],
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    disabled: true,
    placeholder: "Enter Description",
  },
  {
    name:"authorizedBy",
    label:"Authorized By",
    options:["Type-1","Type-2"],
  },
   {
    name: "concessionReason",
    label: "Concession Reason",
    type: "text",
    disabled: true,
    placeholder: "Enter Concession Reason",
  },
];

export const concessionInformationFieldsLayout =[
    {id:"row1", fields:["1stYearConcession","2ndYearConcession","referredBy"]},
    {id:"row2", fields:["description","authorizedBy","concessionReason"]},
];