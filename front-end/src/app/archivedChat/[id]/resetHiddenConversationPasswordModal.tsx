import { User } from "@/redux/slices/user";
import { AppDispatch, RootState } from "@/redux/store";
import {
    resetHiddenConversationPassword
} from "@/shared/APIs/userAPI";
import { Button, Checkbox, ConfigProvider, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { MessageInstance } from "antd/es/message/interface";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { connect } from "react-redux";

type Props = {
    user: User;
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
};

type FieldType = {
    accountPassword: string;
    newHiddenConversationPassword: string;
    retypeNewHiddenConversationPassword: string;
};

const resetHiddenConversationPasswordModal = ({ open, onCancel, messageApi }: Props) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm<FieldType>();

    const onFinish = async (values: FieldType) => {
        try {
            setLoading(true);
            const response = await resetHiddenConversationPassword(values.accountPassword, values.newHiddenConversationPassword);
            onCancel();
            form.resetFields();
            messageApi.success("Reset hidden conversation password successfully");
        } catch (e: any) {
            if(e.response?.status === 417) {
                messageApi.error("Wrong current account password");
                form.resetFields();
            }
            else {
                messageApi.error(e.message);
                form.resetFields();
            }
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
            >
                <div className="text-2xl pb-8 text-center text-main">Reset hidden conversation password</div>
                <Form
                    form={form}
                    name="group"
                    style={{ width: 100 + "%" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    disabled={loading}
                    requiredMark={false}
                >
                    <Form.Item<FieldType>
                        label="Current Account Password"
                        name="accountPassword"
                        rules={[{ required: true, message: "Please input your current account password" }]}
                    >
                        <Input placeholder="Type your current account password" type="password"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="New Hidden Conversation Password"
                        name="newHiddenConversationPassword"
                        rules={[{ required: true, message: "Please input your new password used for hidden conversation" }]}
                    >
                        <Input placeholder="Type your new password used for hidden conversation" type="password"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Retype New Hidden Conversation Password"
                        name="retypeNewHiddenConversationPassword"
                        rules={[{ required: true, message: "Please retype your new password used for hidden conversation" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newHiddenConversationPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The retyped new password does not match!'));
                                },
                            })
                        ]}
                    >
                        <Input placeholder="Retype your new password used for hidden conversation" type="password"/>
                    </Form.Item>

                    <Form.Item className="mt-8">
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
};

const mapState = ({ user }: RootState) => ({
    user: user,
});

export default connect(mapState)(resetHiddenConversationPasswordModal);
