import { useDispatch } from "@/hooks/hooks";
import { CHAT_CONNECT } from "@/modules/chat/chat-constants";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ArrowBack } from "styled-icons/ionicons-outline";

type TChatProps = {};

function ChatPage(props: TChatProps) {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const backHandler = () => {
    router.back();
  };

  useEffect(() => {
    dispatch({
      type: CHAT_CONNECT,
    });
  }, []);

  return (
    <>
      <Button
        color="primary"
        variant="light"
        className="w-min"
        onClick={backHandler}
        startContent={<ArrowBack size={24} />}
      >
        Назад
      </Button>
      <h2 className="text-xl font-semibold">Chat id: {id}</h2>
    </>
  );
}

export default ChatPage;
