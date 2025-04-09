import React from "react";
import { Button } from "@chakra-ui/react";

const ResetFilter = ({ onReset }) => {
  return (
    <Button colorScheme="red" onClick={onReset}>
      Reset
    </Button>
  );
};

export default ResetFilter;