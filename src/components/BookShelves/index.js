import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
console.log(bookshelvesList)

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class BookShelves extends Component {
  state = {
    BookShelvesData: [],
    bookshelfName: '',
    searchText: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchBookShelves()
  }

  onSearchValue = event => {
    this.setState({searchText: event.target.value}, this.fetchBookShelves)
  }

  fetchBookShelves = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {bookshelfName, searchText} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    console.log(url)
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()

    const objectData = data.books.map(book => ({
      id: book.id,
      authorName: book.author_name,
      title: book.title,
      coverPic: book.cover_pic,
      readingStatus: book.read_status,
      rating: book.rating,
    }))
    this.setState({
      BookShelvesData: objectData,
      apiStatus: apiStatusConstants.success,
    })

    // console.log(BookShelvesData)

    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onEventClick = values => {
    this.setState({bookshelfName: values}, this.fetchBookShelves)
  }

  renderSuccessView = () => {
    const {BookShelvesData, value} = this.state

    return (
      <div>
        <Header />
        <div className="Bookshelves-container">
          <div className="row">
            <div className="shelves-card col-md-3 col-12 d-none d-md-block ">
              <h2 className="col-12">Book Shelves</h2>
              {bookshelvesList.map(book => (
                <Status
                  book={book}
                  key={book.id}
                  onEventClick={this.onEventClick}
                />
              ))}
            </div>

            <div className="col-md-9 col-12">
              <div className=" text-b first">
                <h1 className="d-none d-md-block">All Books</h1>
                <div className="input-ab">
                  <input
                    className="input-style"
                    type="text"
                    value={value}
                    onChange={this.onSearchValue}
                  />
                  <BsSearch className="searchbar" />
                </div>
              </div>

              <div className="shelves-card col-12 d-sm-block d-md-none">
                <h2 className="col-12 ">Book Shelves</h2>
                {bookshelvesList.map(book => (
                  <Status
                    book={book}
                    key={book.id}
                    onEventClick={this.onEventClick}
                  />
                ))}
              </div>
              <div className="second">
                {BookShelvesData.map(book => (
                  <BooksList book={book} key={book.id} />
                ))}
                {}
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

export default BookShelves

const Status = props => {
  const {book, onEventClick} = props
  const {label, value} = book
  const labelClick = () => {
    onEventClick(value)
  }
  return (
    <div className="col-md-12  ">
      <button className=" col-md-12 button2" type="button" onClick={labelClick}>
        {label}
      </button>
    </div>
  )
}

const BooksList = props => {
  const {book} = props
  const {coverPic, id, authorName, rating, title, readingStatus} = book

  return (
    <Link to={`books/${id}`} className="link-item">
      <div className="shelves-container ">
        <div className="even">
          <div>
            <img className="img" src={coverPic} alt={title} />
          </div>

          <div className="content">
            <h1 className="heading">{title}</h1>
            <p className="para">{authorName}</p>
            <p className="para">
              Any ratings<span>{rating}</span>
            </p>
            <p className="para">
              Status:<span className="read">{readingStatus}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
