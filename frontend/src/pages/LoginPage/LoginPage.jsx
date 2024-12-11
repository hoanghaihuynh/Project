import React, { useEffect, useState } from 'react';
import { WrapperContainer } from './style'
import { useNavigate } from 'react-router';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from '../../components/Messages/Message';;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "ERR") {
        message.error(data?.message || 'Đăng nhập không thành công, vui lòng thử lại.');
      }
      else {
        navigate('/home');
        message.success();
        console.log('data: ', data);
        localStorage.setItem('access_token', data?.access_token);
        localStorage.setItem('username', username);
      }
    }
  }, [isSuccess, isError]);
  
  const handleOnChangesUsername = (value) => {
    setUsername(value);
    
  }

  const handleOnChangesPassword = (value) => {
    setPassword(value);
  }
  
  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    if (!username) {
      message.error('Vui lòng nhập tên đăng nhập.');
      return;
    }
    if (!password) {
      message.error('Vui lòng nhập mật khẩu.');
      return;
    }

    mutation.mutate({
      username,
      password
    })
    console.log('Login: ', username, password)
  }

  return (
    <div>
      <WrapperContainer>
          <form action="">
            <h1>Login</h1>

            <label htmlFor="">Username</label>
            <InputForm 
              type="text" 
              placeholder='user123' 
              value={username}
              handleOnChange={handleOnChangesUsername}
              required
            />
            <br />
            
            <label htmlFor="">Password</label>
            <InputForm 
              type="password" 
              placeholder='123456' 
              value={password}
              handleOnChange={handleOnChangesPassword}
              required
            />
            
            {/* {data?.status === "ERR" && <span className="error-message">{data?.message}</span>} */}
            <LoadingComponent isLoading={isPending}>
              <ButtonComponent 
              disabled={!username.length || !password.length}
              onClick={handleLogin} 
              border={false}
              size={40}
              styleButton={{
                background: '#3554d1',
                height: '48px',
                border: 'none',
                borderRadius: '4px',
                margin: '0 0 0'
              }}
              textButton={'Đăng nhập'}
              styleTextButton={{color:'#fff', fontSize: '15px', fontWeight: '700'}}
              ></ButtonComponent>
            </LoadingComponent>
            <p>Chưa có tài khoản <a href="#" onClick={handleRegister}> Đăng ký</a></p>
          </form>
      </WrapperContainer>
    </div>
  )
}

export default LoginPage
