import React, { useState, useEffect } from 'react';
import { WrapperContainer } from './style'
import { Button } from 'antd';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'User'; 
    setUsername(storedUsername); 
  }, []);
  const handleProfile = () => {
    navigate('/profile');
  }
  return (
    <div>
        <WrapperContainer>
        <h1>Xin chào user {username}</h1>
            <Button type='primary' onClick={handleProfile}>Cập nhật thông tin tài khoản</Button>
        </WrapperContainer>
    </div>
  )
}

export default HomePage
