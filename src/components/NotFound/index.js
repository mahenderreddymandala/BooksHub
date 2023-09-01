import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="no-result">
      <img
        src="https://res.cloudinary.com/dczy752zw/image/upload/v1693319633/Group_7484_jd7wsg.png"
        alt="no found"
      />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="btn btn-primary btn1">
          Go Back to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
