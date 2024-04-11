import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import LogoImage from '../assets/astrojet-logo.png'
import { Navigate } from 'react-router-dom'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
    return <Navigate to="/"/>
  }

  return (
    <header>
      <div className="container">
      <Link to={'/'}>
        <img src={LogoImage} alt="Astrojet logo here" className='logo--image'/>
      </Link>
        <nav>
          {user && (
            <div className='nav--links'>
              <Link to="/profile">Profile</Link>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div className='nav--links'>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar