import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Navigate, useLocation } from "react-router-dom"

const Login = () => {
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
 
    await login(email, password)
    
  }

  if(localStorage.getItem('user')){
    if(location.state){
      const details = location.state
      return <Navigate to={"/book"} state={details}/>
    }
    else{
      return <Navigate to={"/"}/>
    }
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login