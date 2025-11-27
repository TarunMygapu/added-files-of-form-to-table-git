
export const extraConcessionFeilds = [
    {
    name: "concessionAmount",
    label: "Concession Amount",
    type: "text",
    disabled: true,
    placeholder: "Enter Concession Amount",
  },
  {
    name: "reason",
    label: "Reason",
    type: "text",
    disabled: true,
    placeholder: "Enter Reason",
  },
    {
    name:"concessionReferredBy",
    label:"Concession Referred By",
    options:["Type-1","Type-2"],
  },
]

export const extraConcessionFieldsLayout =[
    {id:"row1", fields: ["concessionAmount", "concessionReferredBy", "reason"]  }
]