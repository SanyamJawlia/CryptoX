import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      width={"50%"}
      bottom={"15"}
      left={"50%"}
      transform={"translateX(-50%)"}
    >
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>Please try after some time.</AlertDescription>
    </Alert>
  );
};

export default ErrorComponent;
