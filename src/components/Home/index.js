import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import TopRatedBooks from '../TopRatedBooks'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    TopRatedBookDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchHomePageData()
  }

  fetchHomePageData = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    const updatedData = data.books.map(book => ({
      title: book.title,
      id: book.id,
      authorName: book.author_name,
      coverPic: book.cover_pic,
    }))

    // console.log(updatedData)
    this.setState({
      TopRatedBookDetails: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderSuccessView = () => {
    const {TopRatedBookDetails} = this.state

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Find Your Next Favorite Books?</h1>
            </div>
            <div className="col-12">
              <p>
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
            </div>
            <div className="Home-container">
              <div className="text-b">
                <h2>Top Rated Books</h2>
                <Link to="/bookshelves">
                  <button type="button" className="btn btn-primary">
                    Find Books
                  </button>
                </Link>
              </div>
              <div className="col-12">
                {/* <div className="home-container1"> */}
                <TopRatedBooks BooksDetails={TopRatedBookDetails} />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderFailure = () => (
    <div className="render-failure-view">
      <img
        src="https://res.cloudinary.com/dczy752zw/image/upload/v1693326577/Group_7522_fwoeki.png"
        alt="failure"
      />
      <p>Something went wrong, Please try again.</p>
      <button className="btn btn-primary" type="button">
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default Home
