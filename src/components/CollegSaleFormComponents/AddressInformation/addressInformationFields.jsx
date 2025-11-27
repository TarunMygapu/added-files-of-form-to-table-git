import SearchboxWithLabel from "../../widgets/Searchbox/SearchboxWithLabel";

export const addressInformationFields = [
  {
    name: "doorNo",
    label: "Door No",
    type: "text",
    disabled: true,
    placeholder: "Enter Door No",
  },
  {
    name: "streetName",
    label: "Street Name",
    type: "text",
    disabled: true,
    placeholder: "Enter Street Name",
  },
  {
    name: "landmark",
    label: "Landmark",
    type: "text",
    disabled: true,
    placeholder: "Enter Landmark",
  },
  {
    name: "area",
    label: "Area",
    type: "text",
    disabled: true,
    placeholder: "Enter Area",
  },
  {
    name: "pincode",
    label: "Pincode",
    type: "text",
    disabled: true,
    placeholder: "Enter Pincode",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    disabled: true,
    placeholder: "Enter State",
  },
  {
    name: "district",
    label: "District",
    type: "text",
    disabled: true,
    placeholder: "Enter District",
  },
  {
    name: "mandal",
    label: "Select Mandal",
    options: ["Mandal-1", "Mandal-2"],
  },
  {
    name: "city",
    label: "City",
    options: ["City-1", "City-2"],
  },
  {
    name: "gpin",
    label: "G-pin (Lattitude & Longitude)",
    component: SearchboxWithLabel,
    placeholder: "Search for Address",
  },
];

export const addressInformationFieldsLayout = [
  { id: "row1", fields: ["doorNo", "streetName", "landmark"] },
  { id: "row2", fields: ["area", "pincode", "state"] },
  { id: "row3", fields: ["district", "mandal", "city"] },
  { id: "row4", fields: ["gpin"] },
];
