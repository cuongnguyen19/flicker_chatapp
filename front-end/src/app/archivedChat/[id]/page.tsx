"use client";
import {
  Conversation,
  changeConversationNotification,
  changePreferConversationLanguage,
  getMessagesAsyncAction,
  select,
    checkHiddenConversationAsyncAction,
} from "@/redux/slices/chat";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Dropdown } from "../../../shared/components/dropDown";
import TextInput from "./textInput";
import { Empty } from "@/shared/components/empty";
import { User } from "@/redux/slices/user";
import { Skeleton, message } from "antd";
import { Loader } from "@/shared/components/loader";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./messageItem";
import InfoSideBar from "./infoSideBar";
import { groupMessage } from "@/shared/utils/groupMessage";
import { formatDate } from "@/shared/utils/dateFormat";
import { Language } from "@/redux/slices/language";
import {
  setConversationNotification,
  setConversationPreferLanguage,
    checkHiddenConversation,
} from "@/shared/APIs/conversationAPI";


type Props = {
  params: { id: string };
  conversations: Conversation[];
  user: User;
  languages: Language[];
  dispatch: AppDispatch;
};

const page = ({ params, conversations, user, languages, dispatch }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [languageIndex, setLanguageIndex] = useState<number>(-1);
  const [showInfo, setShowInfo] = useState(true);
  const [hidden, setHidden] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const data = conversations.find((c) => c.id.toString() === params.id);

  useEffect(() => {
    dispatch(select({ currentId: Number(params.id) }));
  }, [params.id]);

  useEffect(() => {
    if (!data?.preferLanguage) setLanguageIndex(0);
    else setLanguageIndex(languages.findIndex((l) => l.code === data?.preferLanguage));
  }, [languages, data]);

  useEffect(() => {
    if(data) {
      const fetchHiddenStatus = async () => {
        try {
          const response = await checkHiddenConversation(data.id);
          setHidden(response); // Assuming the API returns the boolean value directly
        } catch (error: any) {
          messageApi.error(error.message);
        }
      };

      fetchHiddenStatus();
    }
  }, [data]);

  if (data) {
    const friend = data.users.find((u) => u.id !== user.id);
    const { hasMore } = data.message;
    const messages = groupMessage(data.message.messages, hasMore);

    const loadFunc = () => {
      const page = Math.floor(messages.length / 20);
      dispatch(getMessagesAsyncAction({ messageApi, conversationId: data.id, page, size: 20 }));
    };

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView();
    };

    return (
      <div className="flex h-full">
        {contextHolder}
        {friend || data.isGroup ? (
          <>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between items-center p-2 bg-white">
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold">
                    {data.isGroup ? data.conversationName : friend?.displayName}
                  </h1>
                  <h1 className="text-base font-light">{friend?.online ? "Active" : "Offline"}</h1>
                </div>
                <div className="flex gap-4 items-center">

                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="bg-button rounded-lg w-9 h-9 flex justify-center items-center hover:bg-gray-200"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 9C9.73479 9 9.48043 9.10536 9.2929 9.29289C9.10536 9.48043 9 9.73478 9 10V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9ZM10.38 5.08C10.1365 4.97998 9.86347 4.97998 9.62 5.08C9.49725 5.12759 9.38511 5.19896 9.29 5.29C9.20167 5.3872 9.13065 5.49882 9.08 5.62C9.02402 5.73868 8.99662 5.86882 9 6C8.99924 6.13161 9.02447 6.26207 9.07423 6.38391C9.124 6.50574 9.19732 6.61656 9.29 6.71C9.38721 6.79833 9.49882 6.86936 9.62 6.92C9.7715 6.98224 9.93597 7.00632 10.099 6.99011C10.2619 6.97391 10.4184 6.91792 10.5547 6.82707C10.691 6.73622 10.8029 6.61328 10.8805 6.46907C10.9582 6.32486 10.9992 6.16378 11 6C10.9963 5.73523 10.8927 5.48163 10.71 5.29C10.6149 5.19896 10.5028 5.12759 10.38 5.08ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 flex flex-col-reverse overflow-auto" id="scrollableDiv">
                <InfiniteScroll
                  dataLength={messages.length}
                  next={loadFunc}
                  hasMore={hasMore}
                  inverse={true}
                  loader={
                    <div className="py-6">
                      <Loader />
                    </div>
                  }
                  scrollableTarget="scrollableDiv"
                  className="flex flex-col-reverse"
                >
                  <div ref={messagesEndRef} />
                  {messages.map((m, i) => {
                    const date = new Date(m.createdAt * 1000);
                    const today = new Date();
                    const yesterday = new Date(today.getTime() - 60 * 60 * 24 * 1000);
                    let shouldShowAvatar = false;
                    let shouldShowName = false;
                    if (i === 0) shouldShowAvatar = true;
                    else {
                      if (messages[i - 1].sender.id !== m.sender.id) shouldShowAvatar = true;
                      if (
                        messages[i - 1].messageType === "MESSAGE_TYPE_TIMELINE" ||
                        messages[i - 1].messageType === "MESSAGE_TYPE_SYSTEM_TEXT"
                      )
                        shouldShowAvatar = true;
                    }
                    if (data.isGroup) {
                      if (i === messages.length - 1) shouldShowName = true;
                      else {
                        if (messages[i + 1].sender.id !== m.sender.id) shouldShowName = true;
                        if (messages[i + 1].messageType === "MESSAGE_TYPE_TIMELINE")
                          shouldShowName = true;
                      }
                    }
                    return m.messageType === "MESSAGE_TYPE_TIMELINE" ? (
                      <div key={m.id} className="flex items-center justify-center">
                        <div className="text-center my-4 bg-light-mid rounded-full p-2 px-4">
                          {" "}
                          {today.getDate() === date.getDate() &&
                          today.getMonth() === date.getMonth() &&
                          today.getFullYear() === date.getFullYear()
                            ? "Today"
                            : yesterday.getDate() === date.getDate() &&
                              yesterday.getMonth() === date.getMonth() &&
                              yesterday.getFullYear() === date.getFullYear()
                            ? "Yesterday"
                            : formatDate(date, "ddd, dd MMM yyyy")}
                        </div>
                      </div>
                    ) : (
                      <MessageItem
                        key={m.id}
                        userId={user.id}
                        conversation={data}
                        message={m}
                        shouldShowAvatar={shouldShowAvatar}
                        shouldShowName={shouldShowName}
                        messageApi={messageApi}
                        readOnly={false}
                      />
                    );
                  })}
                </InfiniteScroll>
              </div>

            </div>
            <InfoSideBar user={user} showInfo={showInfo} friend={friend} data={data} messageApi={messageApi} isHidden={hidden}/>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return <Empty text="Conversation does not exist" />;
  }
};

const mapState = ({ chat, user, language }: RootState) => ({
  conversations: chat.conversations,
  user: user,
  languages: language,
});

export default connect(mapState)(page);
