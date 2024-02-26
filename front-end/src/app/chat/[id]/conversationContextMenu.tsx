import React, {useContext, useEffect, useMemo, useState} from "react";
import {Dropdown, MenuProps, Modal} from "antd";
import { AppDispatch, RootState } from "@/redux/store";
import { Language } from "@/redux/slices/language";
import {
    InboxOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    EyeOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Conversation, Message } from "@/redux/slices/chat";
import { MessageInstance } from "antd/es/message/interface";
import { User } from "@/redux/slices/user";

import ConfirmHideConversationModal from "@/app/chat/[id]/confirmHideConversationModal";
import ConfirmDeleteConversationModal from "@/app/chat/[id]/confirmDeleteConversationModal";
import ConfirmArchiveConversationModal from "@/app/chat/[id]/confirmArchiveConversationModal";
import ConfirmUnhideConversationModal from "@/app/chat/[id]/confirmUnhideConversationModal";
import {checkHiddenPassStatus, checkArchivedPassStatus} from "@/shared/APIs/userAPI";

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
    const [openHide, setOpenHide] = useState(false);
    const [openUnhide, setOpenUnhide] = useState(false);
    const [openArchive, setOpenArchive] = useState(false);
    const [hiddenPassStatus, setHiddenPassStatus] = useState(true);
    const [archivedPassStatus, setArchivedPassStatus] = useState(true);

    const items: MenuProps["items"] = useMemo(() => {
        if (isHidden) {
            return [
                {
                    label: (
                        <span className="text-blue-500">
                            <InboxOutlined /> Archive
                    </span>
                    ),
                    key: "archive",
                },
                {
                    label: (
                        <span className="text-red-500">
                            <DeleteOutlined /> Delete
                        </span>
                    ),
                    key: "delete",
                },
                {
                    label: (
                        <span className="text-gray-500">
                            <EyeOutlined /> Unhide
                        </span>
                    ),
                    key: "unhide",
                },
            ];
        } else {
            return [
                {
                    label: (
                        <span className="text-blue-500">
                            <InboxOutlined /> Archive
                    </span>
                    ),
                    key: "archive",
                },
                {
                    label: (
                        <span className="text-red-500">
                            <DeleteOutlined /> Delete
                        </span>
                    ),
                    key: "delete",
                },
                {
                    label: (
                        <span className="text-gray-500">
                            <EyeInvisibleOutlined /> Hide
                        </span>
                    ),
                    key: "hide",
                },
            ];
        }
    }, [language, isHidden]);

    useEffect(() => {
        const fetchHiddenPassStatus = async () => {
            try {
                const response = await checkHiddenPassStatus();
                setHiddenPassStatus(response); // Assuming the API returns the boolean value directly
            } catch (error: any) {
                messageApi.error(error.message);
            }
        };

        fetchHiddenPassStatus();
    }, [user]);

    useEffect(() => {
        const fetchArchivedPassStatus = async () => {
            try {
                const response = await checkArchivedPassStatus();
                setArchivedPassStatus(response); // Assuming the API returns the boolean value directly
            } catch (error: any) {
                messageApi.error(error.message);
            }
        };

        fetchArchivedPassStatus();
    }, [user]);

    const handleMenuClick: MenuProps["onClick"] = (info) => {
        if (info.key === "delete") {
            setOpenDelete(true);
        } else if (info.key === "archive") {
            setOpenArchive(true);
        } else if (info.key === "hide") {
            setOpenHide(true);
        } else {
            setOpenUnhide(true);
        }
    };

    return (
        <>
            <ConfirmHideConversationModal
                open={openHide}
                onCancel={() => setOpenHide(false)}
                conversation={conversation}
                messageApi={messageApi}
                dispatch={dispatch}
                isHiddenPass={hiddenPassStatus}
            />

            <ConfirmArchiveConversationModal
                open={openArchive}
                onCancel={() => setOpenArchive(false)}
                conversation={conversation}
                messageApi={messageApi}
                dispatch={dispatch}
                isArchivedPass={archivedPassStatus}
            />

            <ConfirmUnhideConversationModal
                open={openUnhide}
                onCancel={() => setOpenUnhide(false)}
                conversation={conversation}
                messageApi={messageApi}
                dispatch={dispatch}
            />

            <ConfirmDeleteConversationModal
                open={openDelete}
                onCancel={() => setOpenDelete(false)}
                conversation={conversation}
                messageApi={messageApi}
                dispatch={dispatch}
                isHiddenPass={hiddenPassStatus}
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
