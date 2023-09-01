import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class BookDetails extends Component {
  state = {
    bookDetailsData: [],
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    // console.log(this.props)

    const {match} = this.props
    const {params} = match
    const {id} = params
    //  console.log(id)

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    console.log(url)

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)

    const data = await response.json()
    console.log(data)

    const responseData = {
      aboutAuthor: data.book_details.about_author,
      aboutBook: data.book_details.about_book,
      authorName: data.book_details.author_name,
      coverPic: data.book_details.cover_pic,
      id: data.book_details.id,
      rating: data.book_details.rating,
      title: data.book_details.title,
      readStatus: data.book_details.read_status,
    }
    this.setState({bookDetailsData: responseData})
  }

  render() {
    const {bookDetailsData} = this.state
    console.log(bookDetailsData)

    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      title,
      readStatus,
    } = bookDetailsData
    return (
      <div>
        <Header />
        <div className="book-detail-section">
          <div className="books-ready">
            <div className="section-5">
              <img className="image-detail" src={coverPic} alt={title} />
              <div className="description">
                <h1 className="title2">{title}</h1>
                <p>{authorName}</p>
                <p>
                  Avg Rating <BsFillStarFill className="starClass" />
                  <span>{rating}</span>
                </p>
                <p>
                  Status : <span className="read">{readStatus}</span>
                </p>
              </div>
            </div>
            <hr className="line" />

            <div className="description-2">
              <h1 className="h3">About Author</h1>
              <p>{aboutAuthor}</p>
              <h1 className="h3">About Book</h1>
              <p>{aboutBook}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default BookDetails
