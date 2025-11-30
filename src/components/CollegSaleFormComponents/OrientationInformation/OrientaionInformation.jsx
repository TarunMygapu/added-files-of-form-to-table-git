import React, { useMemo, useEffect, useState } from "react";
import styles from "./OrientationInformation.module.css";

import {
  orientationInfoFields,
  orientationInfoFieldsLayout,
} from "./orientationInfoFields";

import { renderField } from "../../../utils/renderField";

// API Hooks
import {
  useGetAllCities,
  useGetCampuesByCity,
  useGetClassesByCampus,
  useGetOrientationByClass,
  useGetStudentTypeByClass,
  useGetOrientationDatesAndFee,
} from "../../../queires/saleApis/clgSaleApis";

import { formatToDDMMYYYY } from "../../../utils/dateConverter";
import {formatFee} from "../../../utils/feeFormat";

import { useFormikContext } from "formik";
import {toTitleCase} from "../../../utils/toTitleCase";

// =======================
// LABEL + ID Helpers
// =======================
const cityLabel = (c) => c?.name ?? "";
const cityId = (c) => c?.id ?? null;

const campusLabel = (c) => c?.name ?? "";
const campusId = (c) => c?.id ?? null;

const classLabel = (c) => c?.className ?? "";
const classId = (c) => c?.classId ?? null;

const orientationLabel = (o) => o?.name ?? "";
const orientationId = (o) => o?.id ?? null;

const studentTypeLabel = (s) => s?.name ?? "";
const studentTypeId = (s) => s?.id ?? null;

const asArray = (v) => (Array.isArray(v) ? v : []);

const OrientationInformation = ({ initialAcademicYear, initialAcademicYearId, initialCampusName, initialCampusId }) => {
  const { values, setFieldValue } = useFormikContext();

  // Selected IDs
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedCampusId, setSelectedCampusId] = useState(initialCampusId || null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedOrientationId, setSelectedOrientationId] = useState(null);

  // API calls
  const { data: citiesRaw = [] } = useGetAllCities();
  const { data: campusesRaw } = useGetCampuesByCity(selectedCityId);
  const { data: classesRaw } = useGetClassesByCampus(selectedCampusId);
  console.log("Classes: ",classesRaw);
  const { data: orientationRaw } = useGetOrientationByClass(
    selectedClassId,
    selectedCampusId
  );
  const { data: studentTypeRaw } = useGetStudentTypeByClass(
    selectedCampusId,
    selectedClassId
  );
  const { data: orientationExtra } = useGetOrientationDatesAndFee(
    selectedOrientationId
  );
  console.log("OrientationExtra 1: ", orientationExtra);
  // Normalize API results
  const cities = useMemo(() => asArray(citiesRaw), [citiesRaw]);
  const campuses = useMemo(() => asArray(campusesRaw), [campusesRaw]);
  const classes = useMemo(() => asArray(classesRaw), [classesRaw]);
  const orientations = useMemo(() => asArray(orientationRaw), [orientationRaw]);
  const studentTypes = useMemo(() => asArray(studentTypeRaw), [studentTypeRaw]);

  // Label lists
  const cityNames = useMemo(() => cities.map(cityLabel), [cities]);
  const campusNames = useMemo(() => campuses.map(campusLabel), [campuses]);
  const classNames = useMemo(() => classes.map(classLabel), [classes]);
  const orientationNames = useMemo(
    () => orientations.map(orientationLabel),
    [orientations]
  );
  const studentTypeNames = useMemo(
    () => studentTypes.map(studentTypeLabel),
    [studentTypes]
  );

  // Reverse maps: label → ID
  const cityNameToId = useMemo(() => {
    const m = new Map();
    cities.forEach((c) => m.set(cityLabel(c), cityId(c)));
    return m;
  }, [cities]);

  const campusNameToId = useMemo(() => {
    const m = new Map();
    campuses.forEach((c) => m.set(campusLabel(c), campusId(c)));
    return m;
  }, [campuses]);

  const classNameToId = useMemo(() => {
    const m = new Map();
    classes.forEach((c) => m.set(classLabel(c), classId(c)));
    return m;
  }, [classes]);

  const orientationNameToId = useMemo(() => {
    const m = new Map();
    orientations.forEach((o) => m.set(orientationLabel(o), orientationId(o)));
    return m;
  }, [orientations]);

  const studentTypeNameToId = useMemo(() => {
    const m = new Map();
    studentTypes.forEach((s) => m.set(studentTypeLabel(s), studentTypeId(s)));
    return m;
  }, [studentTypes]);

  // ==============================
  // Handle UI Change (Cascading)
  // ==============================
 const onValuesChange = (vals) => {
  console.log("UI Change:", vals);

  /** ================= CITY UPDATE ================== **/
  if (vals.city && cityNameToId.has(vals.city)) {
    const ctId = cityNameToId.get(vals.city);

    if (ctId !== selectedCityId) {
      setSelectedCityId(ctId);

      // RESET CHILD FORM FIELDS
      setFieldValue("campusName", "");
      setFieldValue("joiningClass", "");
      setFieldValue("orientationName", "");
      setFieldValue("studentType", "");
      setFieldValue("orientationStartDate", "");
      setFieldValue("orientationEndDate", "");
      setFieldValue("orientationFee", "");

      // RESET CHILD STATES
      setSelectedCampusId(null);
      setSelectedClassId(null);
      setSelectedOrientationId(null);
    }
  }

  /** ================= CAMPUS UPDATE ================== **/
  if (vals.campusName && campusNameToId.has(vals.campusName)) {
    const cpId = campusNameToId.get(vals.campusName);

    if (cpId !== selectedCampusId) {
      setSelectedCampusId(cpId);

      // RESET CHILD FORM FIELDS
      setFieldValue("joiningClass", "");
      setFieldValue("orientationName", "");
      setFieldValue("studentType", "");
      setFieldValue("orientationStartDate", "");
      setFieldValue("orientationEndDate", "");
      setFieldValue("orientationFee", "");

      // RESET CHILD STATES
      setSelectedClassId(null);
      setSelectedOrientationId(null);
    }
  }

  /** ================= CLASS UPDATE ================== **/
  if (vals.joiningClass && classNameToId.has(vals.joiningClass)) {
    const clId = classNameToId.get(vals.joiningClass);

    if (clId !== selectedClassId) {
      setSelectedClassId(clId);

      // RESET CHILD FORM FIELDS
      setFieldValue("orientationName", "");
      setFieldValue("studentType", "");
      setFieldValue("orientationStartDate", "");
      setFieldValue("orientationEndDate", "");
      setFieldValue("orientationFee", "");

      // RESET CHILD STATE
      setSelectedOrientationId(null);
    }
  }

  /** ================= ORIENTATION UPDATE ================== **/
  if (vals.orientationName && orientationNameToId.has(vals.orientationName)) {
    const oId = orientationNameToId.get(vals.orientationName);
    if (oId !== selectedOrientationId) {
      setSelectedOrientationId(oId);
    }
  }
};


  // ========================================
  // Pre-populate fields from ApplicationSaleDetails
  // ========================================
  useEffect(() => {
    if (initialAcademicYear && !values.academicYear) {
      setFieldValue("academicYear", initialAcademicYear);
    }
  }, [initialAcademicYear, values.academicYear, setFieldValue]);

  useEffect(() => {
    if (initialCampusId && initialCampusId !== selectedCampusId) {
      setSelectedCampusId(initialCampusId);
    }
  }, [initialCampusId, selectedCampusId]);

  useEffect(() => {
    if (initialCampusId && campuses.length > 0) {
      // Find the campus by ID in the campuses list
      const matchingCampus = campuses.find(c => campusId(c) === initialCampusId);
      if (matchingCampus && !values.campusName) {
        const campusLabelValue = campusLabel(matchingCampus);
        setFieldValue("campusName", campusLabelValue);
      }
    } else if (initialCampusName && initialCampusName !== "-" && !values.campusName && campuses.length === 0) {
      // Fallback: use the provided campus name directly if campuses haven't loaded yet
      // This will be updated once campuses load and we find the matching one
      setFieldValue("campusName", initialCampusName);
    }
  }, [initialCampusName, initialCampusId, campuses, values.campusName, setFieldValue]);

  // ========================================
  // Auto-fill dates + fee using formatter
  // ========================================
  useEffect(() => {
    if (orientationExtra) {
      const o = orientationExtra;
      console.log("O orientation values: ", o);
      setFieldValue("orientationStartDate", formatToDDMMYYYY(o.startDate));
      setFieldValue("orientationEndDate", formatToDDMMYYYY(o.endDate));
      setFieldValue("orientationFee", formatFee(o.fee));
    }
  }, [orientationExtra, setFieldValue]);

  // Final dropdown options
  const dynamicOptions = useMemo(
    () => ({
      city: cityNames,
      campusName: campusNames,
      joiningClass: classNames,
      orientationName: orientationNames,
      studentType: studentTypeNames,
    }),
    [cityNames, campusNames, classNames, orientationNames, studentTypeNames]
  );

  // Build final field map
  const fieldMap = useMemo(() => {
    const fm = {};
    orientationInfoFields.forEach((field) => {
      fm[field.name] = {
        ...field,
        options: dynamicOptions[field.name] || field.options || [],
      };
    });
    return fm;
  }, [dynamicOptions]);

  return (
    <div className={styles.clgAppSaleOrientationWrapper}>
      <div className={styles.clgAppSaleOrientationInfoTop}>
        <p className={styles.clgAppSaleOrientationHeading}>
          Orientation Information
        </p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleOrientationInfoBottom}>
        {orientationInfoFieldsLayout.map((row) => (
          <div key={row.id} className={styles.clgAppSalerow}>
            {row.fields.map((fname) => (
              <div key={fname} className={styles.clgAppSaleFieldCell}>
                {renderField(fname, fieldMap, {
                  value: values[fname] ?? "",
                  onChange: (e) => {
                    setFieldValue(fname, e.target.value);

                    // ❌ do NOT cascade for readOnly fields
                    if (fieldMap[fname]?.readOnly) return;

                    onValuesChange({ ...values, [fname]: e.target.value });
                  },
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrientationInformation;
