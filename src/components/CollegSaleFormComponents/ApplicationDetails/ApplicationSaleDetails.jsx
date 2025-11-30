import React, { useEffect } from "react";
import styles from "./ApplicationSaleDetails.module.css";

import leftArrow from "../../../assets/Frame 1410092236.svg";

import { useGetApplicationHeaderValues } from "../../../queires/saleApis/clgSaleApis";

const ApplicationSaleDetails = ({ saleName, onDataLoaded }) => {
  // 🔥 Fetch API
  const { data, isLoading, isError } =
    useGetApplicationHeaderValues("2875074");

  // 🟢 Extract values
  const details = data?.data || {};

  // Extract IDs and values
  const academicYear = details.academicYear || "-";
  const academicYearId = details.academicYearId || details.academicYear_id || details.acadYearId || details.yearId || null;
  const appNo = details.applicationNo || "-";
  const campusName = details.campusName || "-";
  const campusId = details.campusId || details.campus_id || details.branchId || details.branch_id || null;
  const cityName = details.cityName || details.city || "-";
  const cityId = details.cityId || details.city_id || null;
  const zoneName = details.zoneName || "-";
  const appFee = details.applicationFee ?? "0";

  // Log extracted IDs for debugging
  console.log("📊 ApplicationSaleDetails - Extracted data:", {
    academicYear,
    academicYearId,
    campusName,
    campusId,
    cityName,
    cityId,
    appNo,
    zoneName,
    appFee,
    rawDetails: details
  });

  // Pass data to parent component when loaded
  useEffect(() => {
    if (!isLoading && !isError && details && onDataLoaded) {
      console.log("📤 ApplicationSaleDetails - Passing data to parent:", {
        academicYear,
        academicYearId,
        campusName,
        campusId,
        cityName,
        cityId,
        appNo,
        zoneName,
        appFee,
      });
      onDataLoaded({
        academicYear,
        academicYearId,
        campusName,
        campusId,
        cityName,
        cityId,
        appNo,
        zoneName,
        appFee,
      });
    }
  }, [isLoading, isError, details, academicYear, academicYearId, campusName, campusId, cityName, cityId, appNo, zoneName, appFee, onDataLoaded]);

  // 🔄 Loading state
  if (isLoading)
    return (
      <div className={styles.clgAppSaleDetailsTop}>
        <p>Loading application details...</p>
      </div>
    );

  // ❌ Error state
  if (isError)
    return (
      <div className={styles.clgAppSaleDetailsTop}>
        <p>Error loading application details</p>
      </div>
    );

  return (
    <div className={styles.clgAppSaleDetailsTop}>
      <div className={styles.clgAppSaleDetailsLeft}>
        <figure>
          <img src={leftArrow} alt="back arrow" />
        </figure>

        <div className={styles.clgAppSaleDetailsHeadingStepper}>
          <p className={styles.clgAppSaleDetails}>
            Application {saleName}
          </p>
          <div>stepper</div>
        </div>
      </div>

      {/* RIGHT SIDE VALUES FROM API */}
      <div className={styles.clgAppSaleDetailRight}>
        <div className={styles.clgApplicationDetails}>
          <p className={styles.clgAppDetailsHeading}>Academic Year</p>
          <p className={styles.clgAppDetailsValue}>{academicYear}</p>
        </div>

        <div className={styles.clgApplicationDetails}>
          <p className={styles.clgAppDetailsHeading}>Application No</p>
          <p className={styles.clgAppDetailsValue}>{appNo}</p>
        </div>

        <div className={styles.clgApplicationDetails}>
          <p className={styles.clgAppDetailsHeading}>Branch</p>
          <p
            className={styles.clgAppDetailsValue}
            data-fulltext={campusName}
          >
            {campusName}
          </p>
        </div>

        <div className={styles.clgApplicationDetails}>
          <p className={styles.clgAppDetailsHeading}>Zone</p>
          <p
            className={styles.clgAppDetailsValue}
            data-fulltext={zoneName}
          >
            {zoneName}
          </p>
        </div>

        <div className={styles.clgApplicationDetails}>
          <p className={styles.clgAppDetailsHeading}>Application Fee</p>
          <p className={styles.clgAppDetailsValue}>{appFee}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSaleDetails;
