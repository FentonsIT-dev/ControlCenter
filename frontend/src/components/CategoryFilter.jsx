import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";

const CategoryFilter = forwardRef(({ label, categories, onCategoryChange }, ref) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelectedCategory("");
    },
  }));

  return (
    <Box>
      <FormControl>    
        <Select
          placeholder="Select a category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

export default CategoryFilter;