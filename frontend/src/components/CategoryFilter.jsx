import React from "react";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";

const CategoryFilter = ({ label, categories, onCategoryChange }) => {
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  };

  return (
    <Box>
      <FormControl>
        <Select placeholder="Select a category" onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryFilter;