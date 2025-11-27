import Dropdown from "../widgets/Dropdown/Dropdown";
import Inputbox from "../widgets/Inputbox/InputBox";

export const renderField = (fieldName, fieldMap, extraProps = {}) => {
  const field = fieldMap[fieldName];
  if (!field) return null;

  // Custom component (Gender, PhoneNumberBox, DatePicker etc.)
  if (field.component) {
    const ComponentToRender = field.component;
    return (
      <ComponentToRender
        key={field.name}
        name={field.name}
        label={field.label}
        placeholder={field.placeholder}
      />
    );
  }

  // Text input
  if (field.type === "text") {
    return (
      <Inputbox
        key={field.name}
        label={field.label}
        name={field.name}
        placeholder={field.placeholder}
        {...extraProps}
      />
    );
  }

  // Dropdown
  if (field.options && Array.isArray(field.options)) {
    return (
      <Dropdown
        key={field.name}
        dropdownname={field.label}
        name={field.name}
        results={field.options}
        {...extraProps}
      />
    );
  }

  return null;
};
