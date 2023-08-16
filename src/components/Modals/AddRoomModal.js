import React, { useContext, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import { AppContext } from '../Context/AppProvider'
import { useForm } from 'antd/es/form/Form';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';
export default function AddRoomModal() {

    const { isAddRoomModalOpen, setIsAddRoomModalOpen } = useContext(AppContext);
    const { uid } = useContext(AuthContext);
    const [form] = useForm();
    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] })
        setIsAddRoomModalOpen(false);
    }

    const handleCancel = () => {
        setIsAddRoomModalOpen(false);
    }

    return (
        <div>
            <Modal
                title='Add Room'
                open={isAddRoomModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label='Ten phong' name='name'>
                        <Input placeholder='nhap ten phong' />
                    </Form.Item>
                    <Form.Item label='Mo ta' name='description'>
                        <Input.TextArea placeholder='nhap mo ta' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
