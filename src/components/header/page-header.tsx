import { useSelector } from "@/hooks/hooks";
import {
  authorizationUserInfoSelector,
  authorizationisLoadingSelector,
} from "@/modules/authorization/authorization-selectors";
import { Button, Card, CardBody } from "@nextui-org/react";
import router from "next/router";
import React from "react";
import { LogOut } from "styled-icons/boxicons-regular";

type TPageHeaderProps = {};
function PageHeader(props: TPageHeaderProps) {
  const isAuthLoading = useSelector(authorizationisLoadingSelector);
  const { name: userName } = useSelector(authorizationUserInfoSelector);

  const logOutHandler = () => {
    router.push("/login");
  };

  return (
    <Card>
      <CardBody className="p-2 flex flex-row justify-between items-center">
        <h1 className="text-xl font-extrabold">Супер пупер чат</h1>
        <Button
          color="primary"
          variant="light"
          className="max-w-[120px]"
          isLoading={isAuthLoading}
          onClick={logOutHandler}
          endContent={<LogOut size={24} />}
        >
          {userName}
        </Button>
      </CardBody>
    </Card>
  );
}

export default PageHeader;
