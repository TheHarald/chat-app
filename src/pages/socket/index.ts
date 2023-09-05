import io, { Socket } from "socket.io-client";

export const socket: Socket = new (io as any)(
  process.env.NEXT_PUBLIC_SITE_URL,
  {
    path: "/api/socket",
    addTrailingSlash: false,
  }
);
