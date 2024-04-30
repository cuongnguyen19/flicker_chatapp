import {RootState } from "@/redux/store";
import {ConfigProvider, Form, Input, Modal} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Conversation, Message} from "@/redux/slices/chat";

type Props = {
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    conversation: Conversation;
    message: Message;
};

const revealedMessageModal = ({ conversation, message, open, onCancel, messageApi }: Props) => {
    const [loading, setLoading] = useState(false);

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
                <div className="text-xl mt pb-6 text-center" >{message.lockedContent}</div>
            </Modal>
        </ConfigProvider>
    );

};

const mapState = ({ user }: RootState) => ({
    user: user,
});

export default connect(mapState)(revealedMessageModal);
