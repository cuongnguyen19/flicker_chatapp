import { User } from "@/redux/slices/user";
import {AppDispatch, RootState } from "@/redux/store";
import { Button, ConfigProvider, Form, Modal } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Conversation, Message} from "@/redux/slices/chat";
import {hideMessageAsyncAction} from "@/redux/slices/chat";

type Props = {
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    message: Message;
    conversation: Conversation;
    dispatch: AppDispatch;
};

const confirmHideMessageModal = ({ conversation, message, open, onCancel, messageApi, dispatch }: Props) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        try {
            setLoading(true);
            dispatch(hideMessageAsyncAction({ messageApi, conversationId: conversation.id, messageId: message.id }));
            onCancel();
            messageApi.success("Hide message successfully");
        } catch (e: any) {
            messageApi.error(e.message);
        } finally {
            setLoading(false);
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
                }}
                closable={false}
                footer={null}
                width={600}
                title={
                    <div className="flex items-center">
                        <ExclamationCircleOutlined style={{ color: 'orange' }} className="mr-2"  />
                        <span>Confirm Hide Message</span>
                    </div>
                }
            >
                <div className="text-2xl mt-8 pb-8 text-center text-main">Are you sure to hide this message? This message can still be seen by other people in the conversation. This action cannot be undone</div>
                <Form
                    name="deleteMessage"
                    style={{ width: 100 + "%" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    disabled={loading}
                    requiredMark={false}
                >

                    <Form.Item >
                        <div className="flex justify-around">
                            <Button htmlType="submit" type="primary" loading={loading}>
                                Yes
                            </Button>
                            <Button htmlType="reset" onClick={onCancel}>
                                No
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

const mapState = ({ user }: RootState) => ({
    user: user,
});

export default connect(mapState)(confirmHideMessageModal);
