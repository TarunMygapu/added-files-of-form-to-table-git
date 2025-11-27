export const academicInformationFields = [
  {
    name: "hallTicketNo",
    label: "Hall Ticket Number",
    type: "text",
    disabled: true,
    placeholder: "Enter Hall Ticket Number",
  },
  {
    name: "schoolState",
    label: "School State",
    options: ["Mandal-1", "Mandal-2"],
  },
  {
    name: "schoolDistrict",
    label: "School District",
    options: ["Mandal-1", "Mandal-2"],
  },
   {
    name: "schoolType",
    label: "School Type",
    options: ["Mandal-1", "Mandal-2"],
  },
   {
    name: "schoolName",
    label: "School Name",
    options: ["Mandal-1", "Mandal-2"],
  },
  {
    name: "scoreAppNo",
    label: "Score App No",
    type: "text",
    disabled: true,
    placeholder: "Enter Score App Number",
  },
  {
    name: "scoreMarks",
    label: "Score Marks",
    type: "text",
    disabled: true,
    placeholder: "Enter Scores Marks",
  },
   {
    name: "foodType",
    label: "Food Type",
    options: ["Mandal-1", "Mandal-2"],
  },
     {
    name: "bloodGroup",
    label: "Blood Group",
    options: ["Mandal-1", "Mandal-2"],
  },
     {
    name: "caste",
    label: "Caste",
    options: ["Mandal-1", "Mandal-2"],
  },
     {
    name: "religion",
    label: "Religion",
    options: ["Mandal-1", "Mandal-2"],
  },
   {
    name: "schoolType",
    label: "School Type",
    options: ["Mandal-1", "Mandal-2"],
  },
];


export const academicInformationFieldsLayout = [
    {id:"row1", fields:["hallTicketNo","schoolState","schoolDistrict"]},
    {id:"row2", fields:["schoolType", "schoolName", "scoreAppNo"]},
    {id:"row3", fields:["scoreMarks","foodType","bloodGroup"]},
    {id:"row4", fields:["caste","religion",]},
]
