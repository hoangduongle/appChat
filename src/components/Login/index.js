import { Col, Row, Button, Typography } from 'antd'
import React from 'react'
import firebase, { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        auth.signInWithPopup(fbProvider);
    }

    auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
            navigate('/');
        }
    });

    return (
        <div>
            <Row justify='center' style={{ height: 800 }} >
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        FunChat
                    </Title>
                    <Button style={{ width: '100%', marginBottom: 5 }} >
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{ width: '100%' }} onClick={handleLogin}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
