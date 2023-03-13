import React from 'react'
import axios from 'axios';

function LandingPage() {

  // 랜딩페이지에 들어오면 실행함.
  useEffect(() => {
    axios.get('/api/hello') // 서버로 보내면 server의 index.html로 옴.
     .then(response => { console.log(response.data) }) // 서버에서 돌아오는 response를 콘솔창에 보여줌.
  }, [])

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success) {
          props.history.push("/login")
        } else {
          alert('로그아웃하는 데 실패했습니다.')
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage
