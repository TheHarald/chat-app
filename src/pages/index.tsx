import Button from "@/components/button/button";
import ChatCard from "@/components/chat-card/chat-card";
import Input from "@/components/input/Input";
import Loader from "@/components/loader/loader";
import Notification from "@/components/notification/notification";
import Wrapper from "@/components/wrapper/wrapper";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { AUTHORIZATION_CHECK_AUTH } from "@/modules/authorization/authorization-constants";
import { authorizationisAuthorizedSelector } from "@/modules/authorization/authorization-selectors";
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
import styled from "styled-components";
import { Snippet, Switch } from "@nextui-org/react";

const StyledChatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function Home() {
  const dispatch = useDispatch();

  const chats = useSelector(chatsSelector);
  const isLoading = useSelector(chatsIsLoadingSelector);
  const { chatName } = useSelector(chatsFiledsSelector);
  const router = useRouter();

  const logOutHandler = () => {
    router.push("/login");
  };

  useEffect(() => {
    dispatch({
      type: AUTHORIZATION_CHECK_AUTH,
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
  };

  return (
    <div>
      <Button text="Выйти" onClick={logOutHandler} />
      <Input
        value={chatName}
        onChange={chatNameChangeHadler}
        label="Название чата"
      />
      <Button text="Создать чат" onClick={createChantHandler} />
      <StyledChatsList>
        {isLoading ? (
          <Loader size={32} />
        ) : (
          chats.map(({ name, id }) => {
            return <ChatCard key={id} name={name} />;
          })
        )}
      </StyledChatsList>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
