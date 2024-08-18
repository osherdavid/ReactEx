import { useNavigate } from 'react-router-dom';
import { Input, Button, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';


function PlayerName({ playerNumber, inputHolder }) {
    const hint = "Player " + playerNumber;
    return (
        <Input size="large" placeholder={ hint } prefix={<UserOutlined />} onChange={ (e) => inputHolder(e.target.value) }/>
    );
}


export default function LoginForm() {

    const [player1Name, setPlayer1Name] = useState('Player 1');
    const [player2Name, setPlayer2Name] = useState('Player 2');

    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate('/play', {state: {player1Name, player2Name}});
    };
    
    return (
        <>
        <h2>Wait a minute!</h2>
        <h1>Who are you?</h1>
        <Space.Compact direction="vertical" style={{ width: '30%' }}>
            <PlayerName playerNumber='1' inputHolder={ setPlayer1Name } />
            <PlayerName playerNumber='2' inputHolder={ setPlayer2Name } />
            <Button size="large" type="primary" onClick={handlePlayClick}>Play!</Button>
        </Space.Compact>
        </>
    )
}