import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  AUTHORIZATION_CHECK_AUTH,
  AUTHORIZATION_GET_USER_INFO,
} from "@/modules/authorization/authorization-constants";
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
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import {
  authorizationUserInfoSelector,
  authorizationisLoadingSelector,
} from "@/modules/authorization/authorization-selectors";
import { LogOut } from "styled-icons/boxicons-regular";
import Link from "next/link";
import PageHeader from "@/components/header/page-header";
import NavigationBar from "@/components/navbar/navigation-bar";

export default function Home() {
  const dispatch = useDispatch();

  const chats = useSelector(chatsSelector);
  const isChatsLoading = useSelector(chatsIsLoadingSelector);
  const isAuthLoading = useSelector(authorizationisLoadingSelector);

  const isLoading = isChatsLoading || isAuthLoading;

  const { chatName } = useSelector(chatsFiledsSelector);

  useEffect(() => {
    dispatch({
      type: AUTHORIZATION_CHECK_AUTH,
    });
    dispatch({
      type: AUTHORIZATION_GET_USER_INFO,
    });
    dispatch({
      type: GET_CHATS,
    });
  }, []);

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
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Spinner />
        ) : (
          chats.map(({ name, id }) => {
            return <div key={id}>{name}</div>;
          })
        )}
      </div>
    </>
  );
}
