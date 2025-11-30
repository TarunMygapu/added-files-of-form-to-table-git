import React, {useState, useMemo} from "react";
import styles from "./AcademicInformation.module.css"

import { academicInformationFields,academicInformationFieldsLayout, academicFields, getAcademicLayout } from "./acedemicInformationFields";
import { renderField } from "../../../utils/renderField";

import {
  useGetState,
  useGetDistrictByState,
  useGetSchoolType,
  useGetAllClgTypes,
  useGetSchoolNames,
  useGetClgNames,
} from "../../../queires/saleApis/clgSaleApis";

// -----------------------
// Label / ID Helpers
// -----------------------
const stateLabel = (s) => s?.stateName ?? "";
const stateId = (s) => s?.stateId ?? null;

const districtLabel = (d) => d?.name ?? "";
const districtId = (d) => d?.id ?? null;

const schoolTypeLabel = (s) => s?.name ?? "";
const schoolTypeId = (s) => s?.id ?? null;

const collegeTypeLabel = (c) => c?.name ?? "";
const collegeTypeId = (c) => c?.id ?? null;

const schoolNameId = (s) => s?.id ?? null;
const schoolNameLabel = (s) => s?.name ?? "";

const clgNameId = (s) => s?.id ?? null;
const collegeNameLabel = (c) => c?.name ?? "";

// -----------------------
// Academic Component
// -----------------------
const AcademicInformation = ({ joiningClass }) => {
  const [values, setValues] = useState({});

  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

  const [selectedSchoolType, setSelectedSchoolType] = useState(null);
  const [selectedClgType, setSelectedClgType] = useState(null);

  // -----------------------
  // Decide Flow
  // -----------------------
  const isSchoolFlow =
    joiningClass === "INTER1" || joiningClass === "" || joiningClass == null;

  const isCollegeFlow =
    joiningClass === "INTER2" ||
    joiningClass === "LONG_TERM" ||
    joiningClass === "SHORT_TERM";

  // -----------------------
  // Fetch Data
  // -----------------------
  const { data: stateRaw = [] } = useGetState();
  const { data: districtRaw = [] } = useGetDistrictByState(selectedStateId);
  console.log("Districts :",districtRaw);
  const { data: schoolTypesRaw = [] } = useGetSchoolType(isSchoolFlow);
  console.log("School Types: ", schoolTypesRaw);
  const { data: schoolNamesRaw = [] } = useGetSchoolNames(
    selectedDistrictId,
    selectedSchoolType,
    isSchoolFlow
  );

  console.log("School Names: ", schoolNamesRaw);

  const { data: clgTypesRaw = [] } = useGetAllClgTypes(isCollegeFlow);
  console.log("College Types: ",clgTypesRaw);
  const { data: clgNamesRaw = [] } = useGetClgNames(
    selectedDistrictId,
    selectedClgType,
    isCollegeFlow
  );
  console.log("College Names: ", clgNamesRaw);
  // -----------------------
  // Build Options
  // -----------------------
  const stateOptions = useMemo(() => stateRaw.map(stateLabel), [stateRaw]);
  const districtOptions = useMemo(
    () => districtRaw.map(districtLabel),
    [districtRaw]
  );

  const schoolTypeOptions = useMemo(
    () => schoolTypesRaw.map(schoolTypeLabel),
    [schoolTypesRaw]
  );
  const schoolNameOptions = useMemo(
    () => schoolNamesRaw.map(schoolNameLabel),
    [schoolNamesRaw]
  );

  const clgTypeOptions = useMemo(
    () => clgTypesRaw.map(collegeTypeLabel),
    [clgTypesRaw]
  );
  const clgNameOptions = useMemo(
    () => clgNamesRaw.map(collegeNameLabel),
    [clgNamesRaw]
  );

  // -----------------------
  // Build Final Field Map
  // -----------------------
  const fieldMap = useMemo(() => {
    const map = {};

    academicFields.forEach((f) => {
      map[f.name] = { ...f };

      // STATE & DISTRICT
      if (f.name === "schoolState") map[f.name].options = stateOptions;
      if (f.name === "schoolDistrict") map[f.name].options = districtOptions;
        if (f.name === "clgState") map[f.name].options = stateOptions;
      if (f.name === "clgDistrict") map[f.name].options = districtOptions;

      // SCHOOL FLOW
      if (isSchoolFlow) {
        if (f.name === "schoolType") map[f.name].options = schoolTypeOptions;
        if (f.name === "schoolName") map[f.name].options = schoolNameOptions;
      }

      // COLLEGE FLOW
      if (isCollegeFlow) {
        if (f.name === "clgType") map[f.name].options = clgTypeOptions;
        if (f.name === "collegeName") map[f.name].options = clgNameOptions;
      }
    });

    return map;
  }, [
    academicFields,
    stateOptions,
    districtOptions,
    schoolTypeOptions,
    schoolNameOptions,
    clgTypeOptions,
    clgNameOptions,
    isSchoolFlow,
    isCollegeFlow,
  ]);

  // -----------------------
  // Handle Change
  // -----------------------

   // -------------------------
  const resetField = (nameArr) => {
    nameArr.forEach((n) => setValues((prev) => ({ ...prev, [n]: "" })));
  };

 const setFieldValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    /** ================= STATE UPDATE ================= **/
    if (field === "schoolState" || field === "clgState") {
      const stObj = stateRaw.find((s) => stateLabel(s) === value);
      setSelectedStateId(stateId(stObj));
      setSelectedDistrictId(null);

      resetField([
        "schoolDistrict",
        "clgDistrict",
        "schoolType",
        "clgType",
        "schoolName",
        "collegeName",
      ]);

      setSelectedSchoolType(null);
      setSelectedClgType(null);
      return;
    }

    /** ================= DISTRICT UPDATE ================= **/
    if (field === "schoolDistrict" || field === "clgDistrict") {
      const dObj = districtRaw.find((d) => districtLabel(d) === value);
      setSelectedDistrictId(districtId(dObj));

      resetField(["schoolType", "clgType", "schoolName", "collegeName"]);

      setSelectedSchoolType(null);
      setSelectedClgType(null);
      return;
    }

    /** ================= SCHOOL TYPE UPDATE ================= **/
    if (field === "schoolType") {
      const stObj = schoolTypesRaw.find((s) => schoolTypeLabel(s) === value);
      setSelectedSchoolType(schoolTypeLabel(stObj));

      resetField(["schoolName"]);
      return;
    }

    /** ================= COLLEGE TYPE UPDATE ================= **/
    if (field === "clgType") {
      const cObj = clgTypesRaw.find((c) => collegeTypeLabel(c) === value);
      setSelectedClgType(collegeTypeId(cObj));

      resetField(["collegeName"]);
      return;
    }
  };

  // -----------------------
  // Layout Based on Flow
  // -----------------------
  const layout = getAcademicLayout(joiningClass);

  return (
    <div className={styles.clgAppSaleAcademicInfoWrapper}>
      <div className={styles.clgAppSaleAcademicInfoTop}>
        <p className={styles.clgAppSaleAcademicHeading}>Academic Information</p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleAcademicInfoBottom}>
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.clgAppSalerow}>
            {row.map((fname, colIndex) => (
              <div key={colIndex} className={styles.clgAppSaleFieldCell}>
                {fname
                  ? renderField(fname, fieldMap, {
                      value: values[fname] ?? "",
                      onChange: (e) => setFieldValue(fname, e.target.value),
                    })
                  : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicInformation;
