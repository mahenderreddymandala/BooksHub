import {Component} from 'react'
import Cookies from 'js-cookie'

import './Login.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSave = jwtToken => {
    const {history} = this.props
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onFailure = errorMsg => {
    console.log('hai')
    const {showErrorMsg} = this.state
    this.setState({showErrorMsg: true, errorMsg})
    console.log(errorMsg)
    console.log(showErrorMsg)
  }

  SubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSave(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    console.log(username)
    console.log(showErrorMsg)
    console.log(errorMsg)
    return (
      <div className="container">
        <div className="row">
          <div className=" small col-12 col-md-6">
            <img
              src="https://res.cloudinary.com/dczy752zw/image/upload/v1673339813/Rectangle_1467_1_i4mght.jpg"
              alt="website logo"
              className="login-big-image d-none d-md-block"
            />
            <img
              src="https://res.cloudinary.com/dczy752zw/image/upload/v1693241181/Ellipse_99_1_x8vhza.png"
              className="d-block login-big-image d-md-none"
              alt="login"
            />
          </div>
          <div className="col-12 col-md-6 card2">
            <img
              src="https://res.cloudinary.com/dczy752zw/image/upload/v1692368193/Group_7731_s84nwt.png"
              alt="website login"
              className="logo-image"
            />

            <br />
            <form onSubmit={this.SubmitForm}>
              <label htmlFor="name">Username*</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={username}
                onChange={this.onChangeUsername}
              />
              <br />
              <label htmlFor="password">Password*</label>
              <br />
              <input
                type="text"
                value={password}
                onChange={this.onChangePassword}
                name="password*"
              />
              <br />
              <button className="btn btn-primary button-login" type="submit">
                Login
              </button>
            </form>
            <p className="errorText">{errorMsg}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
