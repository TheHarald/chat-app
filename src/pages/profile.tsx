import AvatarCreateModalContent from "@/components/avatar-create-modal/avatar-create-modal";
import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  authorizationUserInfoAvatarSelector,
  authorizationUserInfoSelector,
} from "@/modules/authorization/authorization-selectors";
import { AVATARS_GET_AVATARS } from "@/modules/avatars/avatars-constants";
import {
  avatarsIsLoadingSelector,
  avatarsSelector,
} from "@/modules/avatars/avatars-selectors";
import { avatarsData } from "@/utils/avatars-data";
import {
  Avatar,
  Select,
  SelectItem,
  Button,
  Link,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { Plus } from "styled-icons/evaicons-solid";

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
  const dispatch = useDispatch();
  const avatars = useSelector(avatarsSelector);
  const isLoading = useSelector(avatarsIsLoadingSelector);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    dispatch({
      type: AVATARS_GET_AVATARS,
    });
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold">Профиль</h2>
      <div className="flex flex-row gap-2 items-center">
        <Avatar size="lg" radius="sm" src={avatar.src} />
        <h3>{name}</h3>
      </div>

      <Button
        color="primary"
        variant="solid"
        className="max-w-fit"
        endContent={<Plus size={16} />}
        onClick={onOpen}
      >
        Создать аватар
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <AvatarCreateModalContent />
      </Modal>
      <Select
        items={avatarsData}
        label="Аватар"
        placeholder="Выберите аватар"
        className="max-w-xs"
        disabled={isLoading}
      >
        {avatars.map(({ src, label, id }) => (
          <SelectItem textValue={label} key={id}>
            <AvatarSelectItem src={src} label={label} />
          </SelectItem>
        ))}
      </Select>
    </>
  );
}

export default ProfilePage;
