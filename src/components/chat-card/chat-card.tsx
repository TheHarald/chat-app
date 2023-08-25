import React from "react";

type TChatCardProps = {
  name: string;
};

function ChatCard(props: TChatCardProps) {
  const { name } = props;

  const clickHandler = () => {
    console.log("click");
  };
  return <div></div>;
}

export default ChatCard;
