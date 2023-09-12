import { Avatar, Tooltip } from "@nextui-org/react";
import React from "react";

type TMessageItemProps = {
  text: string;
  isMy: boolean;
  userName: string;
  avatar: string;
};

function MessageItem(props: TMessageItemProps) {
  const { userName, isMy, text, avatar } = props;

  return (
    <div
      className={`flex gap-2 items-end justify-start  ${
        isMy ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Tooltip content={userName}>
        <Avatar src={avatar} radius="sm" className="cursor-pointer" />
      </Tooltip>

      <p
        className={`text-sm text-white ${
          isMy ? "bg-primary-400" : "bg-default-400"
        } p-2 rounded-md max-w-[50%]`}
      >
        {text}
      </p>
    </div>
  );
}

export default MessageItem;
