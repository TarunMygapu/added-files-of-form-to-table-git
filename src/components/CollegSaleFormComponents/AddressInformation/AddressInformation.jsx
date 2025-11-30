import React, {useState, useEffect, useMemo} from "react";
import styles from "./AddressInformation.module.css";

import {
  addressInformationFields,
  addressInformationFieldsLayout
} from "./addressInformationFields";

import { renderField } from "../../../utils/renderField";

import {
  useGetPincode,
  useGetMandalsByDistrict,
  useGetCityByDistrict,
} from "../../../queires/saleApis/clgSaleApis";
import {toTitleCase} from "../../../utils/toTitleCase";

const AddressInformation = () => {
  const [values, setValues] = useState({
    doorNo: "",
    streetName: "",
    landmark: "",
    area: "",
    pincode: "",
    state: "",
    district: "",
    mandal: "",
    city: "",
    gpin: "",
  });

  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

  /* -------------------------
      API CALL - PINCODE
  ------------------------- */
  const { data: pincodeData } = useGetPincode(values.pincode);

  /* -----------------------------------------------------
      HANDLE PINCODE RESPONSE CORRECTLY (IMPORTANT)
  ------------------------------------------------------ */
  useEffect(() => {
    // pincode must be 6 digits + API must have returned data
    if (values.pincode.length === 6 && pincodeData) {
      console.log("USE EFFECT: pincodeData →", pincodeData);

      setValues((prev) => ({
        ...prev,
        state: pincodeData.stateName || "",
        district: pincodeData.districtName || "",
      }));

      setSelectedDistrictId(pincodeData.districtId);
    } else {
      // Reset when pincode removed or < 6 digits
      setValues((prev) => ({
        ...prev,
        state: "",
        district: "",
        mandal: "",
        city: "",
      }));
      setSelectedDistrictId(null);
    }
  }, [pincodeData, values.pincode]);

  console.log("District Id: ", selectedDistrictId);

  /* -------------------------
      FETCH MANDALS & CITY
  ------------------------- */
  const { data: mandalRaw = [] } = useGetMandalsByDistrict(selectedDistrictId);
  console.log("Mandals: ",mandalRaw)
  const { data: cityRaw = [] } = useGetCityByDistrict(selectedDistrictId);

  /* -------------------------
      OPTIONS
  ------------------------- */
  const mandalOptions = useMemo(
    () => mandalRaw.map((m) => toTitleCase(m.name ?? "")),
    [mandalRaw]
  );

  const cityOptions = useMemo(
    () => cityRaw.map((c) => toTitleCase(c.name ?? "")),
    [cityRaw]
  );

  /* -------------------------
      INPUT CHANGE HANDLER
  ------------------------- */
  const setFieldValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  /* -------------------------
      FIELD MAP
  ------------------------- */
  const fieldMap = useMemo(() => {
    const map = {};

    addressInformationFields.forEach((f) => {
      map[f.name] = { ...f };

      if (f.name === "mandal") map[f.name].options = mandalOptions;
      if (f.name === "city") map[f.name].options = cityOptions;
    });

    return map;
  }, [mandalOptions, cityOptions]);

  return (
    <div className={styles.clgAppSaleAddressInfoWrapper}>
      <div className={styles.clgAppSaleAddressInfoTop}>
        <p className={styles.clgAppSaleAddressHeading}>Address Information</p>
        <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
      </div>

      <div className={styles.clgAppSaleAddressInfoBottom}>
        {addressInformationFieldsLayout.map((row) => (
          <div key={row.id} className={styles.clgAppSalerow}>
            {row.fields.map((fname) => (
              <div key={fname} className={styles.clgAppSaleFieldCell}>
                {renderField(fname, fieldMap, {
                  value: values[fname],
                  onChange: (e) => setFieldValue(fname, e.target.value),
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressInformation;
