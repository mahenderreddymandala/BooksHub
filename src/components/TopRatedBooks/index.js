import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const TopRatedBooks = props => {
  const {BooksDetails} = props
  console.log(BooksDetails)

  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    height: '600px',
  }

  return (
    <Slider {...settings}>
      {BooksDetails.map(eachBook => (
        <EachBookSlide key={eachBook.id} eachBook={eachBook} />
      ))}
    </Slider>
  )
}

export default TopRatedBooks

const EachBookSlide = props => {
  const {eachBook} = props
  const {authorName, coverPic, title, id} = eachBook

  return (
    <div className="slick-slider">
      <img src={coverPic} alt={id} className="cover-pics" />
      <h1 className="heading-title">{title}</h1>
      <p className="a-name">{authorName}</p>
    </div>
  )
}
