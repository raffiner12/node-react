import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux' 
import { loginUser} from '../../../_actions/user_action'


function LoginPage(props) {
  const dispatch = useDispatch();
  //Email을 위한 state, password를 위한 state 두 개를 만듦.
  // react hook에서 state를 만들 때는 useState를 입력하면 서식이 자동 완성됨
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = () => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = () => {
    event.preventDefault(); // 페이지가 새로고침되지 않도록.

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        // 로그인 성공하면 root 페이지로 
        if(response.payload.loginSuccess) {
          props.history.push('/') 
        } else {
            alert('Error')
        }
      })


  }
  
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      
      <form style={{ display:'flex', flexDirection:'column'}}
          onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type = "email" value={Email} onChange={onEmailHandler} />  {/* 타이핑을 할 때 onChange 이벤트를 발생 -> state이 바껴 value가 바뀐다 */}
        <label>Password</label>
        <input type = "password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage