import { Avatar } from "@nextui-org/react";
import React from "react";

type TMessageItemProps = {
  text: string;
  isMy: boolean;
  userName: string;
};

function MessageItem(props: TMessageItemProps) {
  const { userName, isMy, text } = props;

  return (
    <div
      className={`flex gap-2 items-end justify-start  ${
        isMy ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar name={userName} radius="sm" />

      <p
        className={`text-sm text-white ${
          isMy ? "bg-blue-500" : "bg-gray-500"
        } p-2 rounded-md max-w-[50%]`}
      >
        {text}
      </p>
    </div>
  );
}

export default MessageItem;
