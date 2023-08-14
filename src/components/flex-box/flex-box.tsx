import React from "react";
import styled from "styled-components";

type TFlexBoxProps = {
  flexDirection: "";
  children: React.ReactNode;
};

const StyledFlexBox = styled.div`
  display: flex;
`;

function FlexBox(props: TFlexBoxProps) {
  return <StyledFlexBox>{props.children}</StyledFlexBox>;
}

export default FlexBox;
