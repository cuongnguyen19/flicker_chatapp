import { User } from "@/redux/slices/user";
import {AppDispatch, RootState } from "@/redux/store";
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Conversation, Message, deleteConversationAsyncAction} from "@/redux/slices/chat";
import {useForm} from "antd/es/form/Form";

type Props = {
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    conversation: Conversation;
    message: Message;
    dispatch: AppDispatch;
};

type FieldType = {
    password: string;
    newPassword: string;
    retypeNewPassword: string;
};

const revealedMessageModal = ({ conversation, message, open, onCancel, messageApi, dispatch }: Props) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm<FieldType>();

    const onFinish = async (values: FieldType) => {
        try {
            setLoading(true);
            dispatch(deleteConversationAsyncAction({ messageApi, conversationId: conversation.id, password: values.password}));
            //onCancel();
            form.resetFields();
        } catch (e: any) {
            messageApi.error(e.message);
            form.resetFields();
        } finally {
            setLoading(false);
            form.resetFields();
        }
    };
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
                    form.resetFields();
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
