import { socket } from "@/pages/socket";

export function soketEmitTs<T>(event: string, data: T) {
  socket.emit(event, data);
}
