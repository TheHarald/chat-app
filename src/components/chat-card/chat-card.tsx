import React from "react";
import styled from "styled-components";
import Button from "../button/button";

type TChatCardProps = {
  name: string;
};

const StyledChatCard = styled.div`
  display: flex;
  padding: 25px 35px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  border-radius: 8px;
  border: 1px solid #d7dbec;
  background: #fff;
`;

const StyledTitle = styled.h4`
  color: #131523;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function ChatCard(props: TChatCardProps) {
  const { name } = props;

  const clickHandler = () => {
    console.log("click");
  };
  return (
    <StyledChatCard>
      <StyledTitle>{name}</StyledTitle>
      <Button disabled onClick={clickHandler} text="Ничего" />
    </StyledChatCard>
  );
}

export default ChatCard;
