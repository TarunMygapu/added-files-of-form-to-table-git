import { useState, useMemo, useEffect } from 'react';
import ApplicationStatusTable from '../ApplicationStatusTableForData/ApplicationStatusTableForData';
import styles from '../../../../widgets/ApplicationStatusDataTable/ApplicationStatusDataTable.module.css';
import './ApplicationStatusTableToManageData.module.css';

// Normalize status to a standard key
const normalizeStatus = (status) => {
    if (!status) return '';
    const normalized = status.toLowerCase().trim();

    // Map all variations to standard keys
    switch (normalized) {
        case 'sold':
        case 'not confirmed':
            return 'sold';
        case 'with pro':
        case 'withpro':
        case 'with_pro':
        case 'available':
            return 'withpro';
        case 'damaged':
        case 'broken':
            return 'damaged';
        case 'unavailable':
            return 'unavailable';
        case 'fast sale':
        case 'fastsale':
        case 'fast_sale':
        case 'fast sold':
        case 'fastsold':
        case 'fast_sold':
            return 'fastsold';
        case 'confirmed':
        case 'approved':
            return 'confirmed';
        default:
            return normalized;
    }
};

// Status mapping configuration
const statusConfig = {
    sold: {
        cssClass: styles.sold,
        displayStatus: 'Sold'
    },
    withpro: {
        cssClass: styles.withpro,
        displayStatus: 'With PRO'
    },
    fastsold: {
        cssClass: styles.fastsold,
        displayStatus: 'Fast Sold'
    },
    confirmed: {
        cssClass: styles.confirmed,
        displayStatus: 'Confirmed'
    },
    unavailable: {
        cssClass: styles.unavailable || '',
        displayStatus: 'Unavailable'
    },
    damaged: {
        cssClass: styles.damaged || '',
        displayStatus: 'Damaged'
    }
};

// Function to get status badge CSS class
const getStatusBadgeClass = (status) => {
    const normalized = normalizeStatus(status);
    return statusConfig[normalized]?.cssClass || '';
};

// Function to map status to displayStatus for SearchResultCardWithStatus
const mapStatusToDisplayStatus = (status) => {
    const normalized = normalizeStatus(status);
    return statusConfig[normalized]?.displayStatus || status;
};

// Function to format date as "14,August 2025"
const formatDate = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    const day = dateObj.getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day},${month} ${year}`;
};

const ApplicationStatusTableToManageData = ({
    studentCategory,
    selectedCampus,
    pageIndex: externalPageIndex,
    setPageIndex: externalSetPageIndex,
    onDataChange,
    category = 'school',
    setSearch,
    navigate,
    handleNavigateToSalePage
}) => {
    const [internalPageIndex, setInternalPageIndex] = useState(0);

    // Use external pageIndex if provided, otherwise use internal state
    const pageIndex = externalPageIndex !== undefined ? externalPageIndex : internalPageIndex;
    const setPageIndex = externalSetPageIndex || setInternalPageIndex;

    // Default columns with custom status cell renderer
    const columns = [
        { accessorKey: "applicationNo", header: "Application No" },
        { accessorKey: "pro", header: "PRO" },
        { accessorKey: "campus", header: "Campus" },
        { accessorKey: "dgm", header: "DGM" },
        { accessorKey: "zone", header: "Zone" },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ getValue }) => {
                const date = getValue();
                return formatDate(date);
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const status = getValue();
                const badgeClass = getStatusBadgeClass(status);
                return (
                    <span className={`${styles.Application_Status_Table_status_badge} ${badgeClass}`}>
                        {status}
                    </span>
                );
            }
        },
    ];

    // Sample data - converted to state so checkbox selection can be updated
    const [allData, setAllData] = useState([
        { applicationNo: "281237494528", pro: "PRO1", campus: "Campus A", dgm: "DGM1", zone: "Zone 1", date: new Date(2025, 7, 14), status: "With PRO", isSelected: false },
        { applicationNo: "656578689084", pro: "PRO2", campus: "Campus B", dgm: "DGM2", zone: "Zone 2", date: new Date(2025, 7, 15), status: "Sold", isSelected: false },
        { applicationNo: "512478963001", pro: "PRO3", campus: "Campus C", dgm: "DGM3", zone: "Zone 3", date: new Date(2025, 7, 16), status: "Confirmed", isSelected: false },
        { applicationNo: "351532456789", pro: "PRO4", campus: "Campus D", dgm: "DGM4", zone: "Zone 4", date: new Date(2025, 7, 17), status: "Fast sold", isSelected: false },
        { applicationNo: "354685236974", pro: "PRO5", campus: "Campus E", dgm: "DGM5", zone: "Zone 5", date: new Date(2025, 7, 18), status: "Unavailable", isSelected: false },
        { applicationNo: "321356251551", pro: "PRO6", campus: "Campus F", dgm: "DGM6", zone: "Zone 6", date: new Date(2025, 7, 19), status: "Damaged", isSelected: false },
        { applicationNo: "165346565954", pro: "PRO7", campus: "Campus G", dgm: "DGM7", zone: "Zone 7", date: new Date(2025, 7, 20), status: "Fast Sold", isSelected: false },
        { applicationNo: "546846535454", pro: "PRO1", campus: "Campus A", dgm: "DGM1", zone: "Zone 1", date: new Date(2025, 7, 21), status: "With PRO", isSelected: false },
        { applicationNo: "515656546565", pro: "PRO2", campus: "Campus B", dgm: "DGM2", zone: "Zone 2", date: new Date(2025, 7, 22), status: "Sold", isSelected: false },
        { applicationNo: "135465151535", pro: "PRO3", campus: "Campus C", dgm: "DGM3", zone: "Zone 3", date: new Date(2025, 7, 23), status: "Fast sold", isSelected: false },
        { applicationNo: "556165165151", pro: "PRO4", campus: "Campus D", dgm: "DGM4", zone: "Zone 4", date: new Date(2025, 7, 24), status: "With PRO", isSelected: false },
        { applicationNo: "165415165165", pro: "PRO5", campus: "Campus E", dgm: "DGM5", zone: "Zone 5", date: new Date(2025, 7, 25), status: "Sold", isSelected: false },
        { applicationNo: "316546515646", pro: "PRO6", campus: "Campus F", dgm: "DGM6", zone: "Zone 6", date: new Date(2025, 7, 26), status: "Confirmed", isSelected: false },
        { applicationNo: "326545153465", pro: "PRO7", campus: "Campus G", dgm: "DGM7", zone: "Zone 7", date: new Date(2025, 7, 27), status: "Fast Sold", isSelected: false },
        { applicationNo: "321351562315", pro: "PRO8", campus: "Campus H", dgm: "DGM8", zone: "Zone 8", date: new Date(2025, 7, 28), status: "Unavailable", isSelected: false },
        { applicationNo: "148656846498", pro: "PRO9", campus: "Campus I", dgm: "DGM9", zone: "Zone 9", date: new Date(2025, 7, 29), status: "Damaged", isSelected: false },
    ]);

    // Apply filters to data
    const data = useMemo(() => {
        let filtered = [...allData];

        // Apply campus filter
        if (selectedCampus && selectedCampus !== "All Campuses") {
            filtered = filtered.filter(item =>
                item.campus === selectedCampus
            );
        }

        // Apply status filter
        if (studentCategory) {
            const isAllSelected =
                studentCategory.all &&
                !studentCategory.sold &&
                !studentCategory.confirmed &&
                !studentCategory.unsold &&
                !studentCategory.withPro;

            if (!isAllSelected) {
                filtered = filtered.filter((item) => {
                    // Use normalizeStatus function to properly normalize status values
                    const normalizedStatus = normalizeStatus(item.status);

                    // Map status values to match filter categories
                    let matches = false;

                    // Sold filter: "Sold" status
                    if (studentCategory.sold && normalizedStatus === "sold") {
                        matches = true;
                    }

                    // Confirmed filter: "Confirmed" status
                    if (studentCategory.confirmed && normalizedStatus === "confirmed") {
                        matches = true;
                    }

                    // Fast Sold filter (unsold filter maps to Fast Sold)
                    if (studentCategory.unsold && normalizedStatus === "fastsold") {
                        matches = true;
                    }

                    // With PRO filter: "With PRO", "Available" statuses
                    if (studentCategory.withPro && normalizedStatus === "withpro") {
                        matches = true;
                    }

                    return matches;
                });
            }
        }

        return filtered;
    }, [allData, studentCategory, selectedCampus]);

    // Notify parent component when data changes (for search functionality)
    useEffect(() => {
        if (onDataChange) {
            // Map data to include displayStatus for SearchResultCardWithStatus
            const dataWithDisplayStatus = data.map(item => ({
                ...item,
                displayStatus: mapStatusToDisplayStatus(item.status)
            }));
            onDataChange(dataWithDisplayStatus);
        }
    }, [data, onDataChange]);

    const handleSelectRow = (row, checked) => {
        // Update the isSelected property of the row in allData
        setAllData(prevData =>
            prevData.map(item =>
                item.applicationNo === row.applicationNo
                    ? { ...item, isSelected: checked }
                    : item
            )
        );
    };

    const handleNavigateToSale = (row) => {
        // Check category and handle accordingly
        const normalizedCategory = category?.toLowerCase()?.trim();
        const normalizedStatus = normalizeStatus(row?.status);

        // Special handling for Fast Sold status when category is college
        if (normalizedCategory === 'college' && normalizedStatus === 'fastsold') {
            // Navigate to CollegeSaleForm for Fast Sold completion
            if (navigate && row?.applicationNo) {
                navigate('/college-application-sale', {
                    state: { applicationData: row }
                });
            }
        } else if (normalizedCategory === 'college') {
            // For college (other statuses): show search card for this application
            if (setSearch && row?.applicationNo) {
                setSearch(row.applicationNo);
            }
        } else {
            // For school (default): navigate to another page
            if (handleNavigateToSalePage) {
                handleNavigateToSalePage(row);
            } else if (navigate && row?.applicationNo) {
                navigate('/school-application-sale', {
                    state: { applicationData: row }
                });
            }
        }
    };

    const handleNavigateToConfirmation = (row) => {
        // Check category and handle accordingly
        const normalizedCategory = category?.toLowerCase()?.trim();
        
        if (normalizedCategory === 'college') {
            // For college: navigate to college confirmation container
            if (navigate && row?.applicationNo) {
                navigate('/college-application-confirmation', {
                    state: { applicationData: row }
                });
            }
        } else {
            // For school: navigate to school confirmation container
            if (navigate && row?.applicationNo) {
                navigate('/school-application-confirmation', {
                    state: { applicationData: row }
                });
            }
        }
    };

    const handleNavigateToDamage = (row) => {
        // Navigate to damaged form for both college and school
        if (navigate && row?.applicationNo) {
            navigate('/damaged-form', {
                state: { applicationData: row }
            });
        }
    };

    return (
        <div>
            <div>
                <ApplicationStatusTable
                    columns={columns}
                    data={data}
                    onSelectRow={handleSelectRow}
                    onNavigateToSale={handleNavigateToSale}
                    onNavigateToConfirmation={handleNavigateToConfirmation}
                    onNavigateToDamage={handleNavigateToDamage}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    totalData={data.length}
                />
            </div>
        </div>
    );

};

export default ApplicationStatusTableToManageData;