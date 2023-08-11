import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Styles = styled.div`
  font-size: 3rem;
  cursor: pointer;
  width: 3rem;
  margin-bottom: 1rem;
`;

const DarkMode = ({ isDarkMode, setIsDarkMode }) => {
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const ref = useRef();

  useEffect(() => {
    if (isDarkMode) {
      ref.current.style.filter = "invert(100%)";
    } else {
      ref.current.style.filter = "none";
    }
  }, [isDarkMode]);

  return (
    <Styles onClick={handleDarkMode} ref={ref}>
      {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
    </Styles>
  );
};

export default DarkMode;
