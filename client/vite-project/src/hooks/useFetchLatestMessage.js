import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const res = await getRequest(`${baseUrl}/messages/${chat?._id}`);
      if (res.error) {
        return console.log(("error getting message...", res.message));
      }
      const lastMessage = res[res?.length - 1];
      setLatestMessage(lastMessage);
    };
    getMessages();
  }, [newMessage, notifications]);
  return { latestMessage };
};
