import React, {useContext, useEffect, useMemo, useState} from "react";
import {Dropdown, MenuProps, Modal} from "antd";
import { AppDispatch, RootState } from "@/redux/store";
import { Language } from "@/redux/slices/language";
import {
    InboxOutlined,
    DeleteOutlined,
    FolderOpenOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Conversation, Message } from "@/redux/slices/chat";
import { MessageInstance } from "antd/es/message/interface";
import { User } from "@/redux/slices/user";

import ConfirmUnarchiveConversationModal from "@/app/archivedChat/[id]/confirmUnarchiveConversationModal";

type Props = {
    children: React.ReactNode;
    language: Language[];
    isHidden: boolean;
    message: Message;
    user: User;
    conversation: Conversation;
    messageApi: MessageInstance;
    disabled: boolean;
    dispatch: AppDispatch;
};

const conversationContextMenu = ({ children, language, isHidden, message, user, conversation, messageApi, disabled, dispatch }: Props) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openUnarchive, setOpenUnarchive] = useState(false);

    const items: MenuProps["items"] = useMemo(() => {

            return [
                {
                    label: (
                        <span className="text-blue-500">
                            <FolderOpenOutlined /> Unarchive
                    </span>
                    ),
                    key: "unarchive",
                },
                {
                    label: (
                        <span className="text-red-500">
                            <DeleteOutlined /> Delete
                        </span>
                    ),
                    key: "delete",
                },
            ];
    }, [language, isHidden]);

    const handleMenuClick: MenuProps["onClick"] = (info) => {
        if (info.key === "delete") {
            setOpenDelete(true);
        } else  {
            setOpenUnarchive(true);
        }
    };

    return (
        <>
            <ConfirmUnarchiveConversationModal
                open={openUnarchive}
                onCancel={() => setOpenUnarchive(false)}
                conversation={conversation}
                messageApi={messageApi}
                dispatch={dispatch}
            />

            <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["contextMenu"]} disabled={disabled}>
                {children}
            </Dropdown>
        </>
    );
};

const mapState = ({ language, user }: RootState) => ({
    user: user,
    language: language,
});

export default connect(mapState)(conversationContextMenu);
