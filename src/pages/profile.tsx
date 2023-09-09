import { useSelector } from "@/hooks/hooks";
import {
  authorizationUserInfoAvatarSelector,
  authorizationUserInfoSelector,
} from "@/modules/authorization/authorization-selectors";
import { avatarsData } from "@/utils/avatars-data";
import { Tab, Tabs, Avatar, Select, SelectItem } from "@nextui-org/react";
import React from "react";

type TProfileProps = {};

const AvatarSelectItem = ({ src, label }: { src: string; label: string }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Avatar radius="sm" src={src} />
      <span>{label}</span>
    </div>
  );
};

function ProfilePage(props: TProfileProps) {
  const { name, avatar } = useSelector(authorizationUserInfoSelector);
  return (
    <>
      <h2 className="text-xl font-semibold">Профиль</h2>
      <div className="flex flex-row gap-2 items-center">
        <Avatar size="lg" radius="sm" src={avatar.src} />
        <h3>{name}</h3>
      </div>
      <Select
        items={avatarsData}
        label="Аватар"
        placeholder="Выберите аватар"
        className="max-w-xs"
      >
        {avatarsData.map(({ value, label }) => (
          <SelectItem textValue={label} key={value}>
            <AvatarSelectItem src={value} label={label} />
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

export default ProfilePage;
