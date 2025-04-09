import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

const DateFilter = forwardRef(({ label, onDateChange }, ref) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelectedDate("");
    },
  }));

  return (
    <Box>
      <FormControl>
        
        <Input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          placeholder="Select a date"
        />
      </FormControl>
    </Box>
  );
});

export default DateFilter;