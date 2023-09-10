import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  AVATARS_CREATE_AVATAR,
  AVATARS_FORM_NAME_CHANGE,
  AVATARS_FORM_SRC_CHANGE,
} from "@/modules/avatars/avatars-constants";
import { avatarsFormsSelector } from "@/modules/avatars/avatars-selectors";
import {
  Avatar,
  Button,
  Input,
  Link,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

type TAvatarCreateModalProps = {
  //   isOpen: boolean;
};

export default function AvatarCreateModalContent(
  props: TAvatarCreateModalProps
) {
  const dispatch = useDispatch();
  const { src, avatarName } = useSelector(avatarsFormsSelector);

  const changeAvatarNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AVATARS_FORM_NAME_CHANGE,
      avatarName: e.target.value,
    });
  };
  const changeAvatarSrcHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AVATARS_FORM_SRC_CHANGE,
      src: e.target.value,
    });
  };

  const onSaveHandler = () => {
    dispatch({
      type: AVATARS_CREATE_AVATAR,
    });
  };
  return (
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1">
        Создание аватара
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-row gap-2 items-end justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Avatar size="lg" radius="sm" src={src} />
            <h3>{avatarName}</h3>
          </div>
          <Button
            href="https://giphy.com/"
            as={Link}
            color="primary"
            showAnchorIcon
            variant="solid"
            className="max-w-fit"
            target="_blank"
          >
            Giphy
          </Button>
        </div>
        <Input
          labelPlacement="outside"
          value={avatarName}
          onChange={changeAvatarNameHandler}
          label="Название автара"
          placeholder="Введите название"
        />
        <Input
          labelPlacement="outside"
          value={src}
          onChange={changeAvatarSrcHandler}
          label="Ссылка с Giphy"
          placeholder="Вставьте ссылку"
        />
        <Button
          onClick={onSaveHandler}
          color="primary"
          variant="solid"
          className="max-w-fit"
        >
          Создать
        </Button>
      </ModalBody>
    </ModalContent>
  );
}
