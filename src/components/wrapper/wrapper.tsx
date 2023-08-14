import React from "react";
import styled from "styled-components";

type TWrapperProps = {
  padding?: 8 | 16 | 24;
  children: React.ReactNode;
};

const StyledWrapper = styled.div<TWrapperProps>`
  background: white;
  border: 1px solid #d7dbec;
  padding: ${(s) => (s.padding ? s.padding : 8)}px;
  display: flex;
  border-radius: 16px;
`;

function Wrapper(props: TWrapperProps) {
  return (
    <StyledWrapper padding={props.padding}>{props.children}</StyledWrapper>
  );
}

export default Wrapper;
