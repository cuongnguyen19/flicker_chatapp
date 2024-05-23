import {RootState } from "@/redux/store";
import {ConfigProvider, Form, Input, Modal} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useEffect, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Conversation, Message} from "@/redux/slices/chat";
import {checkHiddenConversation} from "@/shared/APIs/conversationAPI";
import {getMessageLockedContent} from "@/shared/APIs/messageAPI";

type Props = {
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    conversation: Conversation;
    message: Message;
};

const revealedMessageModal = ({ conversation, message, open, onCancel, messageApi }: Props) => {
    const [loading, setLoading] = useState(false);
    const[lockedContent, setLockedContent] = useState("");

    useEffect(() => {
        if(conversation) {
            const fetchLockedContent = async () => {
                try {
                    const response = await getMessageLockedContent(conversation.id, message.id);
                    setLockedContent(response); // Assuming the API returns the boolean value directly
                } catch (error: any) {
                    messageApi.error(error.message);
                }
            };

            fetchLockedContent();
        }
    }, [conversation]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#435334",
                },
            }}
        >

            <Modal
                open={open}
                onCancel={() => {
                    onCancel();
                }}
                closable={false}
                footer={null}
                width={600}
                title={
                    <div className="flex items-center">
                        <ExclamationCircleOutlined style={{color: 'orange'}} className="mr-2"/>
                        <span>Revealing Message</span>
                    </div>
                }
            >
                <div className="text-2xl mt-8 pb-6 text-center text-main">Message Revealed</div>
                <div className="text-xl mt pb-6 text-center" >{lockedContent}</div>
            </Modal>
        </ConfigProvider>
    );

};

const mapState = ({ user }: RootState) => ({
    user: user,
});

export default connect(mapState)(revealedMessageModal);
