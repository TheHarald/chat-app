import React from "react";
import styled, { keyframes } from "styled-components";

type TLoaderProps = {
  size?: number;
};

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const StyledLoader = styled.div<Omit<TLoaderProps, "isLoading">>`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: ${(s) => (s.size ? s.size : 32)}px;
  height: ${(s) => (s.size ? s.size : 32)}px;
  animation: ${spin} 1s linear infinite;
`;

function Loader(props: TLoaderProps) {
  return <StyledLoader size={props.size}></StyledLoader>;
}

export default Loader;
