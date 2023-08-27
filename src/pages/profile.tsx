import { Tab, Tabs } from "@nextui-org/react";
import React from "react";

type TProfileProps = {};

function ProfilePage(props: TProfileProps) {
  return (
    <>
      <h2 className="text-xl font-semibold">Профиль</h2>
      <Tabs size="sm" aria-label="music">
        <Tab key="photos" title="Photos">
          1
        </Tab>
        <Tab key="music" title="Music">
          2
        </Tab>
        <Tab key="videos" title="Videos">
          3
        </Tab>
      </Tabs>
    </>
  );
}

export default ProfilePage;
