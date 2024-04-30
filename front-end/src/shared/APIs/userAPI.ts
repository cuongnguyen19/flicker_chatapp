import { axiosCaller, axiosFormCaller } from "../utils/axiosCaller";

export const getCurrentUserProfile = async () => {
  try {
    return await axiosCaller("/user/self-profile", "GET");
  } catch (e) {
    throw e;
  }
};

export const getUserProfile = async (userId: number) => {
  try {
    return await axiosCaller(`/user/profile/${userId}`, "GET");
  } catch (e) {
    throw e;
  }
};

export const getNumberOfFriend = async (userId: number) => {
  try {
    return await axiosCaller(`/friendship/numOfFriends/${userId}`, "GET");
  } catch (e) {
    throw e;
  }
};

export const getFriendsStatus = async (userId: number) => {
  try {
    return await axiosCaller(`/friendship/status/${userId}`, "GET");
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (
  displayName: string,
  phoneNumber: string,
  about: string | null,
  language: string | null
) => {
  try {
    return await axiosCaller(`/user/profile/update`, "PUT", {
      displayName,
      phoneNumber,
      about,
      language,
    });
  } catch (e) {
    throw e;
  }
};

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    return await axiosFormCaller(`/user/avatar/update`, "PUT", formData);
  } catch (e) {
    throw e;
  }
};

export const removeAvatar = async () => {
  try {
    return await axiosCaller(`/user/avatar/remove`, "PUT");
  } catch (e) {
    throw e;
  }
};

export const updateCover = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    return await axiosFormCaller(`/user/cover/update`, "PUT", formData);
  } catch (e) {
    throw e;
  }
};

export const removeCover = async () => {
  try {
    return await axiosCaller(`/user/cover/remove`, "PUT");
  } catch (e) {
    throw e;
  }
};

export const updateStatus = async (online: boolean) => {
  try {
    return await axiosCaller(`/user/status/update`, "PUT", { online });
  } catch (e) {
    throw e;
  }
};

export const updateNotification = async (notification: boolean) => {
  try {
    return await axiosCaller(`/user/notification/update`, "PUT", { notification });
  } catch (e) {
    throw e;
  }
};

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  try {
    return await axiosCaller(`/user/password/update`, "POST", { oldPassword, newPassword });
  } catch (e) {
    throw e;
  }
};

export const setHiddenConversationPassword = async (password: string) => {
  try {
    return await axiosCaller(`/user/hiddenPass/set`, "PUT", {password});
  } catch (e) {
    throw e;
  }
};
export const checkHiddenPassStatus = async () => {
  try {
    return await axiosCaller(`/user/hiddenPass/check`, "GET");
  } catch (e) {
    throw e;
  }
};
export const updateHiddenConversationPassword = async (oldPassword: string, newPassword: string) => {
  try {
    return await axiosCaller(`/user/hiddenPass/update`, "PUT", {oldPassword, newPassword});
  } catch (e) {
    throw e;
  }
};
export const resetHiddenConversationPassword = async (accountPassword: string, conversationPassword: string) => {
  try {
    return await axiosCaller(`/user/hiddenPass/reset`, "PUT", {accountPassword, conversationPassword});
  } catch (e) {
    throw e;
  }
};


export const setArchivedConversationPassword = async (password: string) => {
  try {
    return await axiosCaller(`/user/archivedPass/set`, "PUT", {password});
  } catch (e) {
    throw e;
  }
};
export const checkArchivedPassStatus = async () => {
  try {
    return await axiosCaller(`/user/archivedPass/check`, "GET");
  } catch (e) {
    throw e;
  }
};
export const checkArchivedPassMatch = async (password: string) => {
  try {
    return await axiosCaller(`/user/archivedPassMatch/check`, "PUT", {password});
  } catch (e) {
    throw e;
  }
};
export const updateArchivedConversationPassword = async (oldPassword: string, newPassword: string) => {
  try {
    return await axiosCaller(`/user/archivedPass/update`, "PUT", {oldPassword, newPassword});
  } catch (e) {
    throw e;
  }
};
export const resetArchivedConversationPassword = async (accountPassword: string, conversationPassword: string) => {
  try {
    return await axiosCaller(`/user/archivedPass/reset`, "PUT", {accountPassword, conversationPassword});
  } catch (e) {
    throw e;
  }
};

export const setRevealedMessagePassword = async (password: string) => {
  try {
    return await axiosCaller(`/user/revealedMessPass/set`, "PUT", {password});
  } catch (e) {
    throw e;
  }
};
export const checkRevealedMessPassStatus = async () => {
  try {
    return await axiosCaller(`/user/revealedMessPass/check`, "GET");
  } catch (e) {
    throw e;
  }
};
export const checkRevealedMessPassMatch = async (password: string) => {
  try {
    return await axiosCaller(`/user/revealedMessPass/check`, "PUT", {password});
  } catch (e) {
    throw e;
  }
};
export const updateRevealedMessagePassword = async (oldPassword: string, newPassword: string) => {
  try {
    return await axiosCaller(`/user/revealedMessPass/update`, "PUT", {oldPassword, newPassword});
  } catch (e) {
    throw e;
  }
};
export const resetRevealedMessagePassword = async (accountPassword: string, messagePassword: string) => {
  try {
    return await axiosCaller(`/user/revealedMessPass/reset`, "PUT", {accountPassword, messagePassword});
  } catch (e) {
    throw e;
  }
};

