import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordCard from '../PasswordCard'

class PasswordManagerHome extends Component {
  state = {
    website: '',
    name: '',
    password: '',
    showpassword: false,
    passwordsList: [],
    searchValue: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
    // console.log(event.target.value)
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddButton = event => {
    event.preventDefault()
    const {website, name, password} = this.state
    if (website !== '' && name !== '' && password !== '') {
      const passwordObj = {
        id: uuidv4(),
        nameValue: name,
        passwordValue: password,
        websiteValue: website,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, passwordObj],
        name: '',
        website: '',
        password: '',
      }))
    }
  }

  onClickShowpasswords = () => {
    // const {showpassword} = this.state
    this.setState(prevState => ({showpassword: !prevState.showpassword}))
  }

  onChangeSearchInputValue = event => {
    this.setState({searchValue: event.target.value})
  }

  getFilteredList = () => {
    const {searchValue, passwordsList} = this.state
    if (searchValue !== '') {
      const filteredList = passwordsList.filter(
        eachPassword =>
          eachPassword.nameValue
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          eachPassword.websiteValue
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
      )
      return filteredList
    }
    return passwordsList
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const resultList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: resultList})
  }

  render() {
    const {passwordsList, showpassword, website, name, password} = this.state
    const passwordsCount = passwordsList.length
    const passwordManagerImgSmall =
      'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
    const passwordManagerImgLarge =
      'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'

    const filteredList = this.getFilteredList()
    const listLength = filteredList.length > 0

    return (
      <div className="bg-container ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="hero-img"
        />
        <div className="hero-section">
          <div className="image-card">
            <img
              src={passwordManagerImgSmall}
              alt="password manager"
              className="image"
            />
          </div>
          <form className="input-card">
            <h1 className="add-password-heading">Add New Password</h1>
            <div className="each-input-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo"
              />
              <hr className="line" />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="each-input-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="logo"
              />
              <hr className="line" />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                value={name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="each-input-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo"
              />
              <hr className="line" />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button
              type="submit"
              className="add-btn"
              onClick={this.onAddButton}
            >
              Add
            </button>
          </form>
        </div>
        <div className="passwords-list-section">
          <div className="heading-card">
            <div className="title-count-card">
              <h1>Your Passwords</h1>
              <p>{passwordsCount}</p>
            </div>
            <div className="img-search-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInputValue}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password-card">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onClick={this.onClickShowpasswords}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>
          {listLength && (
            <ul className="passwords-card">
              {filteredList.map(eachItem => (
                <PasswordCard
                  key={eachItem.id}
                  eachItem={eachItem}
                  showpassword={showpassword}
                  onDeletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
          {!listLength && (
            <div className="no-passwords-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p>No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManagerHome
