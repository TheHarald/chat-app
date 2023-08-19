import Button from "@/components/button/button";
import Loader from "@/components/loader/loader";
import Notification from "@/components/notification/notification";
import Wrapper from "@/components/wrapper/wrapper";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { AUTHORIZATION_CHECK_AUTH } from "@/modules/authorization/authorization-constants";
import { authorizationisAuthorizedSelector } from "@/modules/authorization/authorization-selectors";
import { GET_CHATS } from "@/modules/chat/chat-constants";
import {
  chatsIsLoadingSelector,
  chatsSelector,
} from "@/modules/chat/chat-selectors";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();

  const chats = useSelector(chatsSelector);
  const isLoading = useSelector(chatsIsLoadingSelector);
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

  return (
    <div>
      <Button text="Выйти" onClick={logOutHandler} />
      <Wrapper>
        {isLoading ? (
          <Loader size={32} />
        ) : (
          chats.map(({ name, id }) => {
            return <div key={id}>{name}</div>;
          })
        )}
      </Wrapper>
    </div>
  );
}
