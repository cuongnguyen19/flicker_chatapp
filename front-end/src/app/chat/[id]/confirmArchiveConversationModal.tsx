import { User } from "@/redux/slices/user";
import {AppDispatch, RootState } from "@/redux/store";
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Conversation, archiveConversationAsyncAction} from "@/redux/slices/chat";
import {useForm} from "antd/es/form/Form";
import {setArchivedConversationPassword} from "@/shared/APIs/userAPI";
import ChangeArchivedConversationPasswordModal from "./changeArchivedConversationPasswordModal";
import ResetArchivedConversationPasswordModal from "./resetArchivedConversationPasswordModal";

type Props = {
    user: User;
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    conversation: Conversation;
    dispatch: AppDispatch;
    isArchivedPass: boolean;
};

type FieldType = {
    password: string;
    newPassword: string;
    retypeNewPassword: string;
};

const confirmArchiveConversationModal = ({ user, conversation, open, onCancel, messageApi, dispatch, isArchivedPass }: Props) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm<FieldType>();
    const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false);

    const onFinish = async (values: FieldType) => {
        try {
            setLoading(true);
            dispatch(archiveConversationAsyncAction({ messageApi, conversationId: conversation.id, password: values.password}));
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
            const response = await setArchivedConversationPassword(values.newPassword);
            dispatch(archiveConversationAsyncAction({ messageApi, conversationId: conversation.id, password: values.newPassword}));
            //onCancel();
            form.resetFields();
            messageApi.success("Set password for archived conversation successfully");
            messageApi.success("Archive conversation successfully");
        } catch (e: any) {
            messageApi.error(e.message);
            form.resetFields();
        } finally {
            setLoading(false);
            form.resetFields();
        }
    };

    if(isArchivedPass) {
        return (
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#435334",
                    },
                }}
            >
                <ChangeArchivedConversationPasswordModal
                    open={openUpdatePassword}
                    onCancel={() => setOpenUpdatePassword(false)}
                    messageApi={messageApi}
                />

                <ResetArchivedConversationPasswordModal
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
                            <span>Confirm Archive Conversation</span>
                        </div>
                    }
                >
                    <div className="text-2xl mt-8 pb-6 text-center text-main">Are you sure to archive this conversation?</div>
                    <div className="text-xl mt pb-6 text-center" >Forgot your password? Either <a href="#" onClick={() => setOpenResetPassword(true)} style={{color: 'blue'}}> reset </a> it or <a href="#" onClick={() => setOpenUpdatePassword(true)} style={{color: 'blue'}}> change </a> it </div>
                    <Form
                        form={form}
                        name="archiveConversation"
                        style={{width: 100 + "%"}}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        disabled={loading}
                        requiredMark={false}
                    >
                        <Form.Item<FieldType>
                            label="Archived Conversation Password"
                            name="password"
                            rules={[{required: true, message: "Please input your password used for archived conversation"}]}
                        >
                            <Input placeholder="Type your password used for archived conversation" type="password"/>
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
                            <span>Set Password for Archived Conversation</span>
                        </div>
                    }
                >
                    <div className="text-2xl mt-8 pb-8 text-center text-main">Please create your password used for archived conversation</div>
                    <Form
                        form={form}
                        name="archivedConversationPassword"
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

export default connect(mapState)(confirmArchiveConversationModal);
