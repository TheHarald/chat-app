import PageHeader from "@/components/header/page-header";
import NavigationBar from "@/components/navbar/navigation-bar";
import { Card, CardBody } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex flex-col gap-4 p-12">
        <PageHeader />
        <div className="flex flex-row gap-4 w-full">
          <NavigationBar />
          <Card className="w-full">
            <CardBody className="p-2 flex flex-col gap-2">{children}</CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Layout;
