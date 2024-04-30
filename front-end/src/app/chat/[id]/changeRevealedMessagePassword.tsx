import { User } from "@/redux/slices/user";
import { AppDispatch, RootState } from "@/redux/store";
import {updateHiddenConversationPassword, updateRevealedMessagePassword} from "@/shared/APIs/userAPI";
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
    oldPassword: string;
    newPassword: string;
    retypeNewPassword: string;
};

const changeRevealedMessagePassword = ({ open, onCancel, messageApi }: Props) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm<FieldType>();

    const onFinish = async (values: FieldType) => {
        try {
            setLoading(true);
            const response = await updateRevealedMessagePassword(values.oldPassword, values.newPassword);
            onCancel();
            form.resetFields();
            messageApi.success("Update revealed message password successfully");
        } catch (e: any) {
            if(e.response?.status === 417) {
                messageApi.error("Wrong current revealed message password");
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
                <div className="text-2xl pb-8 text-center text-main">Change revealed message password</div>
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
                        label="Current Password"
                        name="oldPassword"
                        rules={[{ required: true, message: "Please input your current password used for hidden conversation" }]}
                    >
                        <Input placeholder="Type your current password used for hidden conversation" type="password"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="New Password"
                        name="newPassword"
                        rules={[{ required: true, message: "Please input your new password used for hidden conversation" }]}
                    >
                        <Input placeholder="Type your new password used for hidden conversation" type="password"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Retype New Password"
                        name="retypeNewPassword"
                        rules={[{ required: true, message: "Please retype your new password used for hidden conversation" },
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
                        <Input placeholder="Retype your new password used for revealed message" type="password"/>
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

export default connect(mapState)(changeRevealedMessagePassword);
