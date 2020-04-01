import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const useChat = () => {
  const [messages, setMessages] = useState<Array<string>>([]);

  //declare null socket
  const socketRef = useRef<SocketIOClient.Socket | undefined>();

  useEffect(() => {
    // init socket
    socketRef.current = socketIOClient("http://localhost:5000");

    // listen all new message in the chat
    socketRef.current.on("newChatMessage", (objt: { message: any }) => {
      const { message } = objt;
      setMessages(messages => [...messages, message]);
    });
    // unmount
    return () => {
      // '!' is non-null assertion operator
      socketRef.current!.disconnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    socketRef.current!.emit("newChatMessage", { message });
  };

  return { messages, sendMessage };
};

export default useChat;
