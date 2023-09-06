import ChatItem from "@/components/chat-item/chat-item";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { authorizationisLoadingSelector } from "@/modules/authorization/authorization-selectors";
import { GET_CHATS } from "@/modules/chat/chat-constants";
import {
  chatsIsLoadingSelector,
  chatsSelector,
} from "@/modules/chat/chat-selectors";
import { Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";

type TChatsProps = {};

function ChatsPage(props: TChatsProps) {
  const dispatch = useDispatch();
  const chats = useSelector(chatsSelector);

  const isChatsLoading = useSelector(chatsIsLoadingSelector);
  const isAuthLoading = useSelector(authorizationisLoadingSelector);

  const isLoading = isChatsLoading || isAuthLoading;

  useEffect(() => {
    dispatch({
      type: GET_CHATS,
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {isLoading ? (
          <Spinner />
        ) : (
          chats.map(({ name, id }) => {
            return <ChatItem key={id} chatId={id} chatName={name} />;
          })
        )}
      </div>
    </div>
  );
}

export default ChatsPage;
