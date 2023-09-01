import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBagFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props
  const onlogout = () => {
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  return (
    <ul className="header-section">
      <div className="big-screen">
        <div>
          <Link to="/" className="link-item">
            <img
              src="https://res.cloudinary.com/dczy752zw/image/upload/v1692368193/Group_7731_s84nwt.png "
              alt="website logo"
              className="logo-el"
            />
          </Link>
        </div>

        <div className="home-jobs">
          <Link to="/" className="link-item">
            <p className="homes">Home</p>
          </Link>
          <Link to="/bookshelves" className="link-item">
            <p className="homes">BookShelves</p>
          </Link>
        </div>
        <div>
          <button onClick={onlogout} type="button" className="btn-style">
            Logout
          </button>
        </div>
      </div>
      <div className="small-screen">
        <div>
          <Link to="/" className="link-item">
            <img
              src="https://res.cloudinary.com/dczy752zw/image/upload/v1692368193/Group_7731_s84nwt.png "
              alt="website logo"
              className="logo-el"
            />
          </Link>
        </div>

        <div className="home-jobs">
          <Link to="/" className="link-item">
            <AiFillHome className="icons" />
          </Link>
          <Link to="/bookshelves" className="link-item">
            <BsFillBagFill className="icons" />
          </Link>
        </div>
        <div>
          <button onClick={onlogout} type="button" className="icons-star">
            <FiLogOut />
          </button>
        </div>
      </div>
    </ul>
  )
}

export default withRouter(Header)
