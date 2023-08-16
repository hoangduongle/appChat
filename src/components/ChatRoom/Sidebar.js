import { Col, Row } from 'antd'
import React from 'react'
import UserInfo from './UserInfo'
import RoomList from './RoomList'
import { styled } from 'styled-components'

const SideBarStyles = styled.div`
  background: #636e72;
  color: white;
  height: 100vh;
`;

export default function Sidebar() {
  return (
    <SideBarStyles>
      <Row>
        <Col span={24}><UserInfo /></Col>
        <Col span={24}><RoomList /></Col>
      </Row>
    </SideBarStyles>

  )
}
