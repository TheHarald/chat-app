import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import { Close } from "styled-icons/evil";

type InputProps = {
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

const StyledInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 12px 12px 16px;
  outline: none;
  background: #ffffff;
  border: 1px solid #a1a7c4;
  border-radius: 6px;
  flex-grow: 1;
`;

const StyledLabel = styled.label`
  position: relative;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: #7e84a3;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const StyledCloseIcon = styled(Close)`
  position: absolute;
  height: 20px;
  width: 20px;
  top: 12px;
  right: 8px;
  &:hover {
    cursor: pointer;
  }
`;

function Input(props: InputProps) {
  const { placeholder, label, type, onChange, onReset } = props;

  return (
    <StyledLabel>
      {label}
      <StyledInput
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      ></StyledInput>
      <StyledCloseIcon onClick={onReset}></StyledCloseIcon>
    </StyledLabel>
  );
}

export default Input;
