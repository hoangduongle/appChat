import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd'
import React from 'react'
import { styled } from 'styled-components';
import { AuthContext } from '../Context/AuthProvider';
import { useFirestore } from '../../hooks/useFirestore';
import { AppContext } from '../Context/AppProvider';
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header, p{
            color: white;
        }
        .ant-collapse-content-box{
            padding: 0 40px;
        }
        .add-room{
            color: white;
            padding: 0;
        }
    }
`

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: #e84393;
`

export default function RoomList() {

    const { rooms, setIsAddRoomModalOpen, setSelectedRoomId } = React.useContext(AppContext);
    const handleOpen = () => {
        setIsAddRoomModalOpen(true);
    }
    
    return (
        <Collapse ghost defaultActiveKey={'1'}>
            <PanelStyled header="Danh sách các phòng" key='1'>
                {rooms.map((room) => (
                    <LinkStyled key={room.stringId} onClick={() => setSelectedRoomId(room.stringId)} >{room.name}</LinkStyled>
                ))}
                <Button type='text' icon={<PlusSquareOutlined />} className='add-room' onClick={handleOpen}>Add Room</Button>
            </PanelStyled>
        </Collapse>
    )
}
