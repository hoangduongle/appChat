import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';
import { useForm } from 'antd/es/form/Form';
import { useFirestore } from '../../hooks/useFirestore';

const WrapperStyled = styled.div`
  height: 100vh;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 75px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header{
    &__info{
      display: flex;
      flex-direction: column;
      justify-content: center;

    }
    &__title{
      margin: 0;
      font-weight: bold;
    }
    &__description{
      font-size: 12px;
    }
  }
`;
const ContentStyled = styled.div`
  height: calc(100% - 98px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-center: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;

  }
`;

const MessageListStyled = styled.div`
max-height: 100%;
overflow-y: auto;
`;

export default function ChatWindow() {

  const { selectedRoom, members, setInviteMemberModalOpen } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const { uid, photoURL, displayName } = useContext(AuthContext);

  const [form] = useForm();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid: uid,
      photoURL: photoURL,
      roomId: selectedRoom.stringId,
      displayName: displayName,
    });
    form.resetFields(['message']);
  }

  const condition = useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.stringId,
  }), [selectedRoom.stringId]);
  const messages = useFirestore('messages', condition);
  return (
    <WrapperStyled>
      {selectedRoom ? (<>
        <HeaderStyled>
          <div className='header__info'>
            <p className='header__title'>{selectedRoom.name}</p>
            <span className='header__description'>{selectedRoom.description}</span>
          </div>
          <div>
            <Button icon={<UserAddOutlined />} onClick={() => setInviteMemberModalOpen(true)} >Invite</Button>
            <Avatar.Group size='small' maxCount={2}>
              {members.map(member =>
                <Tooltip key={member.uid} title={member.displayName}>
                  <Avatar src={member.photoURL}>{member.photoURL ? "" : member.displayName?.charAt(0)?.toUpperCase}</Avatar>
                </Tooltip>)}
            </Avatar.Group>
          </div>
        </HeaderStyled>
        <ContentStyled>
          <MessageListStyled>
            {messages.map(message =>
              <Message
                key={message.id}
                text={message.text}
                photoURL={message.photoURL}
                displayName={message.displayName}
                createdAt={message.createdAt} />)}
          </MessageListStyled>
          <Form form={form}>
            <FormStyled>
              <Form.Item name='message'>
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder='Enter your message...' autoComplete='off' bordered={false} />
              </Form.Item>
              <Button type='primary' onClick={handleOnSubmit} >Send</Button>
            </FormStyled>
          </Form>
        </ContentStyled>
      </>) : Alert("Please select a room", "info")}
    </WrapperStyled>
  )
}
