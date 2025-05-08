import React, { createContext, useState, useContext } from "react";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [resultData, setResultData] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <ResultContext.Provider value={{ resultData, setResultData, capturedImage, setCapturedImage }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => useContext(ResultContext);
