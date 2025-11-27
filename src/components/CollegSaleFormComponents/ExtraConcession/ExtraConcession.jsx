import React, { useState } from "react";
import styles from "./ExtraConcession.module.css";
// Assuming renderField is a function that takes field config and props
import { renderField } from "../../../utils/renderField"; 
// Assuming these are your configuration arrays
import { extraConcessionFeilds, extraConcessionFieldsLayout } from "./extraConcessionFields"; 

const ExtraConcession = () => {
    // 1. State for form field values
    const [values, setValues] = useState({
        academicYear: "",
        branchName: "",
        branchType: "",
        // ... include all fields rendered below ...
    });

    // 2. State for the boolean toggle
    const [showConcessionFields, setShowConcessionFields] = useState(false);

    const setFieldValue = (field, value) => {
        setValues((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    // Handler to toggle the state
    const handleToggleConcession = () => {
        setShowConcessionFields(prev => !prev);
    };

    // Create field map for fast lookup
    const fieldMap = extraConcessionFeilds.reduce((acc, f) => {
        acc[f.name] = f;
        return acc;
    }, {});

    return (
        <div className={styles.clgAppSaleExtraConcessionWrapper}>
            <div className={styles.clgAppSaleExtraConcessionInfoTop}>
                <div className={styles.extraConcessionTopLeft}>
                    {/* The Toggle Element (Outer Border) */}
                    <div 
                        className={styles.extraConcessionSelection}
                        onClick={handleToggleConcession} 
                        role="button" 
                        aria-checked={showConcessionFields}
                        tabIndex="0"
                    >
                        {/* Conditional Rendering of the Inner Indicator */}
                        {showConcessionFields && ( // <-- NEW: Only render this div if true
                             <div className={styles.extraSelectionOption}>
                                {/* You can keep the `styles.extraSelectionOption` without the `styles.checked` class 
                                    because your base CSS for `.extraSelectionOption` already provides the checked style. 
                                    If you want the base div to be empty, see the CSS section below.
                                */}
                            </div>
                        )}
                    </div>
                    <p className={styles.clgAppSaleExtraConcessionHeading}>
                        Concession Written on Application
                    </p>
                </div>
                <div className={styles.clgAppSalePersonalInfoSeperationLine}></div>
            </div>

            {/* Conditional Rendering: Show form fields ONLY if showConcessionFields is true */}
            {showConcessionFields && (
                <div className={styles.clgAppSaleExtraConcessionInfoBottom}>
                    {extraConcessionFieldsLayout.map((row) => (
                        <div key={row.id} className={styles.clgAppSalerow}>
                            {row.fields.map((fname) => (
                                <div key={fname} className={styles.clgAppSaleFieldCell}>
                                    {renderField(fname, fieldMap, {
                                        value: values[fname],
                                        onChange: (e) => setFieldValue(fname, e.target.value) 
                                    })}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExtraConcession;