import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ label, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <Box>
      <FormControl>
        
        <DatePicker
          placeholderText='Select a date'
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={<Input />}
          dateFormat="yyyy-MM-dd"
        />
      </FormControl>
    </Box>
  );
};

export default DateSelector;