import { User } from "@/redux/slices/user";
import {AppDispatch, RootState } from "@/redux/store";
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Conversation, unarchiveConversationAsyncAction} from "@/redux/slices/chat";
import {useForm} from "antd/es/form/Form";

type Props = {
    user: User;
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    conversation: Conversation;
    dispatch: AppDispatch;
};

type FieldType = {
    password: string;
};

const confirmUnarchiveConversationModal = ({ user, conversation, open, onCancel, messageApi, dispatch }: Props) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm<FieldType>();

    const onFinish = async (values: FieldType) => {
        try {
            setLoading(true);
            dispatch(unarchiveConversationAsyncAction({ messageApi, conversationId: conversation.id}));
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
                        <ExclamationCircleOutlined style={{ color: 'orange' }} className="mr-2"  />
                        <span>Confirm Unarchive Conversation</span>
                    </div>
                }
            >
                <div className="text-2xl mt-8 pb-8 text-center text-main">Are you sure to unarchive this conversation?</div>
                <Form
                    form={form}
                    name="unarchiveConversation"
                    style={{ width: 100 + "%" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    disabled={loading}
                    requiredMark={false}
                >

                    <Form.Item className="mt-4">
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

export default connect(mapState)(confirmUnarchiveConversationModal);
