// import React from 'react'

import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const res = await getRequest(`${baseUrl}/users/find/${recipientId}`);
      if (res.error) {
        return setError(res);
      }
      setRecipientUser(res);
    };
    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};

export default useFetchRecipient;
