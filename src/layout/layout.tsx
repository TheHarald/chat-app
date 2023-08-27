import PageHeader from "@/components/header/page-header";
import NavigationBar from "@/components/navbar/navigation-bar";
import { useDispatch } from "@/hooks/hooks";
import {
  AUTHORIZATION_CHECK_AUTH,
  AUTHORIZATION_GET_USER_INFO,
} from "@/modules/authorization/authorization-constants";
import { Card, CardBody } from "@nextui-org/react";
import React, { PropsWithChildren, useEffect } from "react";
const Layout = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: AUTHORIZATION_CHECK_AUTH,
    });
    dispatch({
      type: AUTHORIZATION_GET_USER_INFO,
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 lg:p-12">
        <PageHeader />
        <div className="flex flex-row gap-4 w-full">
          <NavigationBar />
          <Card className="w-full">
            <CardBody className="p-4 flex flex-col gap-2">{children}</CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Layout;
