import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div>
    <div className="footer-section">
      <a href="https://www.google.com/">
        <FaGoogle className="icons" />
      </a>
      <a href="https://twitter.com/mahende45257668">
        <FaTwitter className="icons" />
      </a>
      <a href="https://www.instagram.com/mahenderreddy_mandala/">
        <FaInstagram className="icons" />
      </a>
      <a href="https://youtube.com/">
        <FaYoutube className="icons" />
      </a>
    </div>
    <p className="text-rooter">Contact Us</p>
  </div>
)

export default Footer
