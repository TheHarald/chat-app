import React from "react";
import styled from "styled-components";

type TButtonProps = {
  text: string;
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

function Button(props: TButtonProps) {
  const { onClick, text } = props;
  return <Styledbutton onClick={onClick}>{text}</Styledbutton>;
}

export default Button;
