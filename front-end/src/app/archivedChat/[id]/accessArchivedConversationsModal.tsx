import { User } from "@/redux/slices/user";
import {AppDispatch, RootState } from "@/redux/store";
import {Button, ConfigProvider, Form, Input, Modal} from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, {useContext, useState} from "react";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {useForm} from "antd/es/form/Form";
import {useRouter} from "next/navigation";
import {checkArchivedPassMatch} from "@/shared/APIs/userAPI";

type Props = {
    open: boolean;
    onCancel: () => void;
    dispatch: AppDispatch;
    messageApi: MessageInstance;
};

type FieldType = {
    password: string;
};

const accessArchivedConversationsModal = ({open, onCancel, dispatch, messageApi}: Props) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm<FieldType>();
    const router = useRouter();

    const onFinish = async (values: FieldType) => {
        try {
            setLoading(true);
            const response = await checkArchivedPassMatch(values.password);
            router.push(`/archivedChat`);
            onCancel();
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
                        <span>Confirm Access Archived Conversations</span>
                    </div>
                }
            >
                <div className="text-2xl mt-8 pb-8 text-center text-main">You are about to access archived conversations</div>
                <Form
                    form={form}
                    name="archivedConversations"
                    style={{ width: 100 + "%" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    disabled={loading}
                    requiredMark={false}
                >
                    <Form.Item<FieldType>
                        label="Archived Conversations Password"
                        name="password"
                        rules={[{required: true, message: "Please input your password used for archived conversations"}]}
                    >
                        <Input placeholder="Type your password used for archived conversations" type="password"/>
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

export default connect(mapState)(accessArchivedConversationsModal);
