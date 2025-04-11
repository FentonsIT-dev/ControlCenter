import React from "react";
import { Button } from "@chakra-ui/react";
import * as XLSX from "xlsx";

const DownloadExcel = ({ data, fileName }) => {
  const handleDownload = () => {
    if (!data || data.length === 0) {
      console.error("No data available to download.");
      return;
    }

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");

    // Generate and download the Excel file
    XLSX.writeFile(workbook, `${fileName || "filtered_data"}.xlsx`);
  };

  return (
    <Button colorScheme="green" onClick={handleDownload}>
      Download Excel
    </Button>
  );
};

export default DownloadExcel;