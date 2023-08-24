import Loader from "@/components/loader/loader";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { AUTHORIZATION_CHECK_AUTH } from "@/modules/authorization/authorization-constants";
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
import { Button, Input } from "@nextui-org/react";

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
    dispatch({
      type: CHANGE_CHAT_NAME,
      chatName: "",
    });
  };

  return (
    <div>
      <Button onClick={logOutHandler}>Выйти</Button>
      <Input
        value={chatName}
        onChange={chatNameChangeHadler}
        label="Название чата"
      />
      <Button onClick={createChantHandler}>Создать чат</Button>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Loader size={32} />
        ) : (
          chats.map(({ name, id }) => {
            return <div key={id}>{name}</div>;
          })
        )}
      </div>
    </div>
  );
}
