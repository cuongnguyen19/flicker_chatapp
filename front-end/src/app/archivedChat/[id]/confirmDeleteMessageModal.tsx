import { User } from "@/redux/slices/user";
import {RootState } from "@/redux/store";
import { Button, ConfigProvider, Form, Modal } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ClientContext } from "../layout";
import {Conversation, Message} from "@/redux/slices/chat";

type Props = {
    user: User;
    open: boolean;
    onCancel: () => void;
    messageApi: MessageInstance;
    message: Message;
    conversation: Conversation;
};

const confirmDeleteMessageModal = ({ user, conversation, message, open, onCancel, messageApi }: Props) => {
    const client = useContext(ClientContext);
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        try {
            setLoading(true);
            if (client && client.connected) {
                client.publish({
                    destination: `/app/delete/${conversation.id}/${user.id}/${message.id}`,
                });
            }
            onCancel();
            messageApi.success("Delete message successfully");
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
                        <ExclamationCircleOutlined style={{ color: 'red' }} className="mr-2"  />
                        <span>Confirm Delete Message</span>
                    </div>
                }
            >
                <div className="text-2xl mt-8 pb-8 text-center text-main">Are you sure to delete this message? This action cannot be undone</div>
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

export default connect(mapState)(confirmDeleteMessageModal);
