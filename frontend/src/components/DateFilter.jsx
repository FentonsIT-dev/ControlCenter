import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

const DateSelector = ({ label, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

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
};

export default DateSelector;