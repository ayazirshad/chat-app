export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    let message = "An error occured...";
    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data;
};
