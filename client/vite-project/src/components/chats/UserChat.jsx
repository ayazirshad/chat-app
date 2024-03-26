// import React from 'react'

import { Stack } from "react-bootstrap";
import useFetchRecipient from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { onlineUsers, notifications, markThisUserNotificationAsRead } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipient(chat, user);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const { latestMessage } = useFetchLatestMessage(chat);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );
  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const trimText = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" alt="profile" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.text && trimText(latestMessage?.text)}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div>{moment(latestMessage?.createdAt).calendar()}</div>
        <div
          className={
            thisUserNotifications?.length > 0 && "this-user-notifications"
          }
        >
          {thisUserNotifications?.length > 0 && thisUserNotifications?.length}
        </div>
        <span className={` ${isOnline && "user-online"}`}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
