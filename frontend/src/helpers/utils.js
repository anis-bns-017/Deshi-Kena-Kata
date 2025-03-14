export const formatISODate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // Extracts `yyyy-mm-dd`
  };
  
  export const generateAllMonths = (startYear, endYear) => {
    const allMonths = [];
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthName = new Date(`${year}-${month}-01`).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        allMonths.push(monthName);
      }
    }
    return allMonths;
  };