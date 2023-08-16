import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import React from 'react'
import { styled } from 'styled-components'
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';

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
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className='header__info'>
          <p className='header__title'>Room 1</p>
          <span className='header__description'>Day la room 1</span>

        </div>
        <div>
          <Button icon={<UserAddOutlined />} >Invite</Button>
          <Avatar.Group size='small' maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="B">
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title="C">
              <Avatar>C</Avatar>
            </Tooltip>
            <Tooltip title="D">
              <Avatar>D</Avatar>
            </Tooltip>
          </Avatar.Group>
        </div>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message text="a" photoURL={null} displayName="Duong" createdAt="16/8/2023" />
          <Message text="a" photoURL={null} displayName="Duong" createdAt="16/8/2023" />
          <Message text="a" photoURL={null} displayName="Duong" createdAt="16/8/2023" />
          <Message text="a" photoURL={null} displayName="Duong" createdAt="16/8/2023" />
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input placeholder='Enter your message...' autoComplete='off' bordered={false} />
          </Form.Item>
          <Button>Send</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}
