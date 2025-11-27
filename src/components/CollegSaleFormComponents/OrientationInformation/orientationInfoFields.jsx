
export const orientationInfoFields = [
    {
    name: "academicYear",
    label: "Academic Year",
    type: "text",
    disabled: true,
    placeholder: "Academic Year",
  },
  {
    name: "branchName",
    label: "Branch",
    options:["Branch-1","Branch-2"],
  },
  {
    name:"branchType",
    label:"Branch Type",
    options:["Type-1","Type-2"],
  },
  {
    name:"city",
    label:"City",
    options:["Type-1","Type-2"],
  },
  {
    name:"joiningClass",
    label:"Joining Class",
    options:["Type-1","Type-2"],
  },
  {
    name:"orientationName",
    label:"Course Name",
    options:["Type-1","Type-2"],
  },
  {
    name:"studentType",
    label:"Student Type",
    options:["Type-1","Type-2"],
  },
  {
    name: "orientationStartDate",
    label: "Course Start Date",
    type: "text",
    disabled: true,
    placeholder: "Course Start Date",
  },
  {
    name: "orientationEndDate",
    label: "Course End Date",
    type: "text",
    disabled: true,
    placeholder: "Course End Date",
  },
  {
    name: "orientationFee",
    label: "Course Fee",
    type: "text",
    disabled: true,
    placeholder: "Course Fee",
  },
   {
    name:"orientationBatch",
    label:"Orientation Batch",
    options:["Type-1","Type-2"],
  }
];

export const orientationInfoFieldsLayout =[
    {id:"row1", fields:["academicYear","city","branchName"]},
    {id:"row2", fields:["joiningClass","orientationName","studentType"]},
    {id:"row3", fields:["orientationStartDate","orientationEndDate","orientationFee"]},
];
