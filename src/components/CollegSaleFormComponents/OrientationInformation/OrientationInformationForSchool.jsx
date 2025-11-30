import React, { useEffect, useState, useMemo } from "react";
import styles from "./OrientationInformation.module.css";
import { useFormikContext } from "formik";

import {
  orientationInfoFieldsForSchool,
  orientationInfoFieldsLayoutForSchool
} from "./orientationFieldsForSchool";

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
import { formatFee } from "../../../utils/feeFormat";

// Helper functions
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

const OrientationInformationForSchool = ({ initialAcademicYear, initialAcademicYearId, initialCampusName, initialCampusId, initialCityName, initialCityId }) => {
  const { values, setFieldValue } = useFormikContext();

  // Selected IDs for cascading dropdowns
  const [selectedCityId, setSelectedCityId] = useState(initialCityId || null);
  const [selectedCampusId, setSelectedCampusId] = useState(initialCampusId || null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedOrientationId, setSelectedOrientationId] = useState(null);

  console.log("🏫 OrientationInformationForSchool - Component rendered");
  console.log("📥 Props received:", {
    initialAcademicYear,
    initialAcademicYearId,
    initialCampusName,
    initialCampusId
  });
  console.log("📋 Current Formik values:", values);
  console.log("🔑 Selected IDs:", {
    selectedCityId,
    selectedCampusId,
    selectedClassId,
    selectedOrientationId
  });

  // API calls for dynamic dropdowns
  const { data: citiesRaw = [] } = useGetAllCities();
  const { data: campusesRaw } = useGetCampuesByCity(selectedCityId);
  const { data: classesRaw } = useGetClassesByCampus(selectedCampusId);
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

  console.log("📊 API Data:", {
    cities: citiesRaw?.length || 0,
    campuses: campusesRaw?.length || 0,
    classes: classesRaw?.length || 0,
    orientations: orientationRaw?.length || 0,
    studentTypes: studentTypeRaw?.length || 0,
    orientationExtra: orientationExtra ? "Available" : "Not available"
  });

  // Normalize API results
  const cities = useMemo(() => asArray(citiesRaw), [citiesRaw]);
  const campuses = useMemo(() => asArray(campusesRaw), [campusesRaw]);
  const classes = useMemo(() => asArray(classesRaw), [classesRaw]);
  const orientations = useMemo(() => asArray(orientationRaw), [orientationRaw]);
  const studentTypes = useMemo(() => asArray(studentTypeRaw), [studentTypeRaw]);

  // Label lists for dropdowns
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

  // Pre-populate fields from ApplicationSaleDetails
  useEffect(() => {
    console.log("🔄 useEffect - Pre-populating academicYear and academicYearId");
    if (initialAcademicYear && !values.academicYear) {
      console.log("✅ Setting academicYear:", initialAcademicYear);
      setFieldValue("academicYear", initialAcademicYear);
    }
    if (initialAcademicYearId && !values.academicYearId) {
      console.log("✅ Setting academicYearId:", initialAcademicYearId);
      setFieldValue("academicYearId", initialAcademicYearId);
    }
  }, [initialAcademicYear, initialAcademicYearId, values.academicYear, values.academicYearId, setFieldValue]);

  useEffect(() => {
    console.log("🔄 useEffect - Pre-populating city, branchName and campusId");
    if (initialCityId && !selectedCityId) {
      console.log("✅ Setting selectedCityId:", initialCityId);
      setSelectedCityId(initialCityId);
    }
    if (initialCityName && !values.city) {
      console.log("✅ Setting city:", initialCityName);
      setFieldValue("city", initialCityName);
    }
    if (initialCampusName && !values.branchName) {
      console.log("✅ Setting branchName:", initialCampusName);
      setFieldValue("branchName", initialCampusName);
    }
    if (initialCampusId && !values.campusId) {
      console.log("✅ Setting campusId:", initialCampusId);
      setFieldValue("campusId", initialCampusId);
      setSelectedCampusId(initialCampusId);
    }
  }, [initialCityName, initialCityId, initialCampusName, initialCampusId, values.city, values.branchName, values.campusId, selectedCityId, setFieldValue]);

  // Sync branchName dropdown when campuses load and we have initialCampusId
  useEffect(() => {
    if (initialCampusId && campuses.length > 0 && !values.branchName) {
      const matchingCampus = campuses.find(c => campusId(c) === initialCampusId);
      if (matchingCampus) {
        const campusLabelValue = campusLabel(matchingCampus);
        console.log("✅ Found matching campus in list, setting branchName:", campusLabelValue);
        setFieldValue("branchName", campusLabelValue);
      }
    }
  }, [initialCampusId, campuses, values.branchName, setFieldValue]);

  // Handle cascading dropdown changes
  const onValuesChange = (vals) => {
    console.log("🔄 UI Change:", vals);

    // City change
    if (vals.city && cityNameToId.has(vals.city)) {
      const ctId = cityNameToId.get(vals.city);
      if (ctId !== selectedCityId) {
        setSelectedCityId(ctId);
        setFieldValue("branchName", "");
        setFieldValue("joiningClass", "");
        setFieldValue("orientationName", "");
        setFieldValue("studentType", "");
      }
    }

    // Campus/Branch change
    if (vals.branchName && campusNameToId.has(vals.branchName)) {
      const cmpsId = campusNameToId.get(vals.branchName);
      if (cmpsId !== selectedCampusId) {
        setSelectedCampusId(cmpsId);
        setFieldValue("campusId", cmpsId);
        setFieldValue("joiningClass", "");
        setFieldValue("orientationName", "");
        setFieldValue("studentType", "");
      }
    }

    // Class change
    if (vals.joiningClass && classNameToId.has(vals.joiningClass)) {
      const clsId = classNameToId.get(vals.joiningClass);
      if (clsId !== selectedClassId) {
        setSelectedClassId(clsId);
        setFieldValue("orientationName", "");
        setFieldValue("studentType", "");
        setFieldValue("orientationFee", "");
      }
    }

    // Orientation change
    if (vals.orientationName && orientationNameToId.has(vals.orientationName)) {
      const orId = orientationNameToId.get(vals.orientationName);
      if (orId !== selectedOrientationId) {
        setSelectedOrientationId(orId);
        setFieldValue("studentType", "");
      }
    }
  };

  // Auto-fill dates + fee when orientation is selected
  useEffect(() => {
    if (orientationExtra) {
      const o = orientationExtra;
      console.log("✅ Auto-filling orientation dates and fee:", o);
      setFieldValue("orientationStartDate", formatToDDMMYYYY(o.startDate));
      setFieldValue("orientationEndDate", formatToDDMMYYYY(o.endDate));
      setFieldValue("orientationFee", formatFee(o.fee));
    }
  }, [orientationExtra, setFieldValue]);

  // Build dynamic options for dropdowns
  const dynamicOptions = useMemo(
    () => ({
      city: cityNames,
      branchName: campusNames,
      joiningClass: classNames,
      orientationName: orientationNames,
      studentType: studentTypeNames,
    }),
    [cityNames, campusNames, classNames, orientationNames, studentTypeNames]
  );

  // Build final field map with dynamic options
  const fieldMap = useMemo(() => {
    const fm = {};
    orientationInfoFieldsForSchool.forEach((field) => {
      fm[field.name] = {
        ...field,
        options: dynamicOptions[field.name] || field.options || [],
      };
    });
    console.log("🗺️ Field map with options:", Object.keys(fm).map(key => ({
      name: key,
      optionsCount: fm[key].options?.length || 0
    })));
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
        {orientationInfoFieldsLayoutForSchool.map((row) => {
          console.log("📦 Rendering row:", row.id, "with fields:", row.fields);
          return (
            <div key={row.id} className={styles.clgAppSalerow}>
              {row.fields.map((fname) => {
                if (!fname) return null; // Skip empty fields
                const fieldValue = values[fname] ?? "";
                const fieldConfig = fieldMap[fname];
                const optionsCount = fieldConfig?.options?.length || 0;
                console.log(`  📝 Field: ${fname}, Value: ${fieldValue}, Options: ${optionsCount}`);
                return (
                  <div key={fname} className={styles.clgAppSaleFieldCell}>
                    {renderField(fname, fieldMap, {
                      value: fieldValue,
                      onChange: (e) => {
                        console.log(`🔄 Field ${fname} changed to:`, e.target.value);
                        setFieldValue(fname, e.target.value);
                        
                        // Handle cascading dropdowns (skip for readOnly/disabled fields)
                        if (fieldConfig?.readOnly || fieldConfig?.disabled) return;
                        
                        onValuesChange({ ...values, [fname]: e.target.value });
                      }
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrientationInformationForSchool;
