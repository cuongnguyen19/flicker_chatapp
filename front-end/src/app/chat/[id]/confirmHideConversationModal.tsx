import { User } from "@/redux/slices/user";
import {AppDispatch, RootState } from "@/redux/store";
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Conversation, hideConversationAsyncAction} from "@/redux/slices/chat";
import {useForm} from "antd/es/form/Form";
import {setHiddenConversationPassword} from "@/shared/APIs/userAPI";
import ChangeHiddenConversationPasswordModal from "./changeHiddenConversationPasswordModal";
import ResetHiddenConversationPasswordModal from "./resetHiddenConversationPasswordModal";

type Props = {
    user: User;
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    conversation: Conversation;
    dispatch: AppDispatch;
    isHiddenPass: boolean;
};

type FieldType = {
    password: string;
    newPassword: string;
    retypeNewPassword: string;
};

const confirmHideConversationModal = ({ user, conversation, open, onCancel, messageApi, dispatch, isHiddenPass }: Props) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm<FieldType>();
    const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false);

    const onFinish = async (values: FieldType) => {
        try {
            setLoading(true);
            dispatch(hideConversationAsyncAction({ messageApi, conversationId: conversation.id, password: values.password}));
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

    const onCreatePassword = async (values: FieldType) => {
        try {
            setLoading(true);
            const response = await setHiddenConversationPassword(values.newPassword);
            dispatch(hideConversationAsyncAction({ messageApi, conversationId: conversation.id, password: values.newPassword}));
            //onCancel();
            form.resetFields();
            messageApi.success("Set password for hidden conversation successfully");
            messageApi.success("Hide conversation successfully");
        } catch (e: any) {
            messageApi.error(e.message);
            form.resetFields();
        } finally {
            setLoading(false);
            form.resetFields();
        }
    };

    if(isHiddenPass) {
        return (
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#435334",
                    },
                }}
            >
                <ChangeHiddenConversationPasswordModal
                    open={openUpdatePassword}
                    onCancel={() => setOpenUpdatePassword(false)}
                    messageApi={messageApi}
                />

                <ResetHiddenConversationPasswordModal
                    open={openResetPassword}
                    onCancel={() => setOpenResetPassword(false)}
                    messageApi={messageApi}
                />

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
                            <span>Confirm Hide Conversation</span>
                        </div>
                    }
                >
                    <div className="text-2xl mt-8 pb-6 text-center text-main">Are you sure to hide this conversation?</div>
                    <div className="text-xl mt pb-6 text-center" >Forgot your password? Either <a href="#" onClick={() => setOpenResetPassword(true)} style={{color: 'blue'}}> reset </a> it or <a href="#" onClick={() => setOpenUpdatePassword(true)} style={{color: 'blue'}}> change </a> it </div>
                    <Form
                        form={form}
                        name="hideConversation"
                        style={{width: 100 + "%"}}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        disabled={loading}
                        requiredMark={false}
                    >
                        <Form.Item<FieldType>
                            label="Hidden Conversation Password"
                            name="password"
                            rules={[{required: true, message: "Please input your password used for hidden conversation"}]}
                        >
                            <Input placeholder="Type your password used for hidden conversation" type="password"/>
                        </Form.Item>

                        <Form.Item>
                            <div className="flex justify-around">
                                <Button htmlType="submit" type="primary" loading={loading}>
                                    Submit
                                </Button>
                                <Button htmlType="reset" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        );
    }
    else {
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
                            <span>Set Password for Hidden Conversation</span>
                        </div>
                    }
                >
                    <div className="text-2xl mt-8 pb-8 text-center text-main">Please create your password used for hidden conversation</div>
                    <Form
                        form={form}
                        name="hiddenConversationPassword"
                        style={{ width: 100 + "%" }}
                        onFinish={onCreatePassword}
                        autoComplete="off"
                        layout="vertical"
                        disabled={loading}
                        requiredMark={false}
                    >
                        <Form.Item<FieldType>
                            label="New Password"
                            name="newPassword"
                            rules={[{ required: true, message: "Please input your new password" }]}
                        >
                            <Input placeholder="Type your new password" type="password"/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Retype New Password"
                            name="retypeNewPassword"
                            rules={[{ required: true, message: "Please retype your new password" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The retyped new password does not match!'));
                                    },
                                })
                            ]}
                        >
                            <Input placeholder="Retype your new password" type="password"/>
                        </Form.Item>

                        <Form.Item >
                            <div className="flex justify-around">
                                <Button htmlType="submit" type="primary" loading={loading}>
                                    Submit
                                </Button>
                                <Button htmlType="reset" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        );
    }
};

const mapState = ({ user }: RootState) => ({
    user: user,
});

export default connect(mapState)(confirmHideConversationModal);
