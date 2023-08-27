import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { ChatMultiple } from "styled-icons/fluentui-system-regular";
import NextLink from "next/link";

type TChatItemProps = {
  chatName: string;
  chatId: string;
};
function ChatItem(props: TChatItemProps) {
  const { chatId, chatName } = props;
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody className="flex flex-row gap-2 items-center justify-between">
        <p className="text-medium">{chatName}</p>
        <Button
          isIconOnly
          color="primary"
          variant="light"
          as={NextLink}
          href={`chats/${chatId}`}
        >
          <ChatMultiple size={24} />
        </Button>
      </CardBody>
    </Card>
  );
}

export default ChatItem;
