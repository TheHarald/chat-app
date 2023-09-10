import { Button, Card, CardBody, Link } from "@nextui-org/react";
import React from "react";
import NextLink from "next/link";
import { uuidv4 } from "@/utils/uuid";
import { ChatMultiple } from "styled-icons/fluentui-system-regular";
import { User } from "styled-icons/boxicons-regular";
import { HomeMax } from "styled-icons/material-outlined";

type TNavigationBarProps = {};

const rutes = [
  {
    title: "Главная",
    icon: <HomeMax size={24} />,
    id: uuidv4(),
    href: "/",
  },
  {
    title: "Профиль",
    icon: <User size={24} />,
    id: uuidv4(),
    href: "/profile",
  },
  {
    title: "Чаты",
    icon: <ChatMultiple size={24} />,
    id: uuidv4(),
    href: "/chats",
  },
];

function NavigationBar(props: TNavigationBarProps) {
  return (
    <Card className="w-[180px] h-min">
      <CardBody className="p-2 flex flex-col gap-2">
        {rutes.map(({ id, title, icon, href }) => (
          <Button
            className="justify-start"
            color="primary"
            variant="light"
            key={id}
            href={href}
            as={NextLink}
            startContent={icon}
            fullWidth={true}
          >
            {title}
          </Button>
        ))}
      </CardBody>
    </Card>
  );
}

export default NavigationBar;
