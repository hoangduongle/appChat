import React, { useContext, useState } from 'react'
import { Avatar, Form, Modal, Select, Spin } from 'antd'
import { AppContext } from '../Context/AppProvider'
import { useForm } from 'antd/es/form/Form';
import { AuthContext } from '../Context/AuthProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then(newOption => {
                setOptions(newOption);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}

async function fetchUserList(search, curMembers) {
    const snapshot = await db.collection('users').where('keywords', 'array-contains', search).orderBy('displayName').limit(20).get();
    return snapshot.docs.map(doc => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
    })).filter((member) => !curMembers.includes(member.value));
}

export default function InviteMemberModal() {

    const { isInviteMemberModalOpen, setInviteMemberModalOpen, selectedRoomId, selectedRoom } = useContext(AppContext);
    const [value, setValue] = useState([]);
    const [form] = useForm();
    const handleOk = () => {
        form.resetFields();
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        });
        setInviteMemberModalOpen(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setValue([]);
        setInviteMemberModalOpen(false);
    }

    return (
        <div>
            <Modal
                title='Invite Member'
                open={isInviteMemberModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        label="Name of member"
                        value={value}
                        placeholder='Enter Name of member'
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}
