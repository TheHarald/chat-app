import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  CHANGE_CHAT_NAME,
  CREATE_CHAT,
  GET_CHATS,
} from "@/modules/chat/chat-constants";
import {
  chatsFiledsSelector,
  chatsIsLoadingSelector,
  chatsSelector,
} from "@/modules/chat/chat-selectors";
import { useEffect } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import { authorizationisLoadingSelector } from "@/modules/authorization/authorization-selectors";

export default function Home() {
  const dispatch = useDispatch();

  const { chatName } = useSelector(chatsFiledsSelector);

  const chatNameChangeHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CHANGE_CHAT_NAME,
      chatName: e.target.value,
    });
  };

  const createChantHandler = () => {
    dispatch({
      type: CREATE_CHAT,
    });
    dispatch({
      type: CHANGE_CHAT_NAME,
      chatName: "",
    });
  };

  return (
    <>
      <Input
        value={chatName}
        onChange={chatNameChangeHadler}
        label="Название чата"
      />
      <Button onClick={createChantHandler}>Создать чат</Button>
    </>
  );
}
