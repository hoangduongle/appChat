import React from 'react'
import { AuthContext } from './AuthProvider';
import { useFirestore } from '../../hooks/useFirestore';


export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isAddRoomModalOpen, setIsAddRoomModalOpen] = React.useState(false);
    const [isInviteMemberModalOpen, setInviteMemberModalOpen] = React.useState(false);
    const [selectedRoomId, setSelectedRoomId] = React.useState('');
    const { uid } = React.useContext(AuthContext);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        }
    }, [uid]);
    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = React.useMemo(() => rooms.find((room) => room.stringId === selectedRoomId) || {}, [rooms, selectedRoomId]);

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom]);

    const members = useFirestore('users', usersCondition);
    return (
        <AppContext.Provider value={{ 
            rooms, 
            isInviteMemberModalOpen, 
            setInviteMemberModalOpen, 
            isAddRoomModalOpen, 
            setIsAddRoomModalOpen, 
            selectedRoomId, 
            setSelectedRoomId, 
            selectedRoom, 
            members }}>
            {children}
        </AppContext.Provider>
    )
}
