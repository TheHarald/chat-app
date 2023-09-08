import { socket } from "@/pages/socket";
import { useDispatch } from "./hooks";
import {
  CHAT_RECIVE_MESSAGE,
  CHAT_USER_CONNECTED,
  CHAT_USER_DISCONNECTED,
} from "@/types/socket-constants";
import { TChatMessage } from "@/modules/chat/chat-types";
import { ADD_MESSAGE, SET_ROOM_USERS } from "@/modules/chat/chat-constants";
import { TSocketJoinUserResponseData } from "@/types/root-types";

export function useSocket() {
  const dispatch = useDispatch();
  function initListeners() {
    socket.on(CHAT_RECIVE_MESSAGE, (data: TChatMessage) => {
      dispatch({
        type: ADD_MESSAGE,
        message: data,
      });
    });

    socket.on(CHAT_USER_CONNECTED, (data: TSocketJoinUserResponseData[]) => {
      dispatch({
        type: SET_ROOM_USERS,
        roomUsers: data,
      });
    });

    socket.on(CHAT_USER_DISCONNECTED, (data: TSocketJoinUserResponseData[]) => {
      dispatch({
        type: SET_ROOM_USERS,
        roomUsers: data,
      });
    });
  }

  function removeListeners() {
    socket.removeAllListeners();
  }

  return {
    removeListeners,
    initListeners,
  };
}
