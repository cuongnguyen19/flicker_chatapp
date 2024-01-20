"use client";
import React, { createContext, useEffect, useState } from "react";
import magnifier from "../../../public/magnifier-24-outline.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { connect } from "react-redux";
import AvatarWithStatus from "@/shared/components/avatarWithStatus";
import ChatItem from "./chatItem";
import { User } from "@/redux/slices/user";
import {
  Conversation,
  addConversationAsyncAction,
  addMessage,
  changeConversationAvatar,
  changeConversationName,
  deleteMessage,
  getConversationsAsyncAction,
  getArchivedConversationsAsyncAction,
  resetState,
  searchConversationsAsyncAction,
  updateUsersInConversation,
} from "@/redux/slices/chat";
import { message } from "antd";
import { Loader } from "@/shared/components/loader";
import { Empty } from "@/shared/components/empty";
import { Client, StompSubscription } from "@stomp/stompjs";
import { getUserRoles } from "@/shared/APIs/conversationAPI";
import { addNotification } from "@/redux/slices/notification";

export const ClientContext = createContext<Client | null>(null);

type Props = {
  children: React.ReactNode;
  currentId: number | null;
  user: User;
  conversations: Conversation[];
  loading: boolean;
  dispatch: AppDispatch;
};

const layout = ({ children, currentId, user, conversations, loading, dispatch }: Props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [query, setQuery] = useState("");
  const [client] = useState<Client>(
    new Client({
      brokerURL: process.env.NEXT_PUBLIC_WEBSOCKET_STOMP_URL,
    })
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query === "") dispatch(getArchivedConversationsAsyncAction({ messageApi }));
      else dispatch(searchConversationsAsyncAction({ messageApi, query }));
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);



  const handleClickFriendItem = (id: number) => {
    router.push(`/archivedChat/${id}`);
  };
  return (
    <ClientContext.Provider value={client}>
      <div className="flex-1 flex">
        {contextHolder}
        <div className="flex flex-col basis-1/4 items-center">
          <h1 className="text-2xl font-semibold my-4">Chat</h1>
          <AvatarWithStatus image={user.avatar} userName={user.displayName} active={user.online} />
          <h1 className="text-2xl font-bold my-2">{user.displayName}</h1>
          {user.online ? (
            <div className="rounded-xl bg-transparent text-main font-light px-4 py-1">Active</div>
          ) : (
            <div className="rounded-xl bg-text text-black font-light px-4 py-1">Offline</div>
          )}
          <div className="flex flex-col p-2 my-3 self-start w-full">
            <h1 className="font-semibold text-xl mb-2">Messages</h1>
            <div className="flex gap-2 p-2 shadow-[4px_4px_20px_0_rgba(0,0,0,0.25)] rounded-xl">
              <Image src={magnifier} alt="magnifier" />
              <input
                className="flex-1 focus:outline-none"
                placeholder="Searching"
                onChange={(e) => setQuery(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-1 flex-col w-full overflow-auto">
            {!loading ? (
              conversations.length > 0 ? (
                conversations.map((c) => (
                  <ChatItem
                    key={c.id}
                    messageApi={messageApi}
                    active={currentId === c.id}
                    data={c}
                    user={user}
                    handleClick={() => handleClickFriendItem(c.id)}
                  />
                ))
              ) : (
                <Empty text="You have no conversations" />
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="bg-light-gray flex-1">{children}</div>
      </div>
    </ClientContext.Provider>
  );
};

const mapState = ({ chat, user }: RootState) => ({
  currentId: chat.currentId,
  user: user,
  conversations: chat.conversations,
  loading: chat.loadingConversation,
});

export default connect(mapState)(layout);
