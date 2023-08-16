import React from "react";
import styled, { keyframes } from "styled-components";
import Loader from "../loader/loader";

type TButtonProps = {
  text: string;
  isLoading?: boolean;
  onClick: () => void;
};

const Styledbutton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  background: #1e5eff;
  border-radius: 6px;
  height: 44px;

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  outline: none;
  border: none;
  appearance: none;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background: #4f81ff;
  }
  &:active {
    background: #336dff;
  }
`;
const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const StyledLoader = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
`;

function Button(props: TButtonProps) {
  const { onClick, text } = props;
  return (
    <Styledbutton disabled={props.isLoading} onClick={onClick}>
      {props.isLoading ? <StyledLoader /> : text}
    </Styledbutton>
  );
}

export default Button;
