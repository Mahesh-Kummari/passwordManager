import './index.css'

const PasswordCard = props => {
  const {eachItem, showpassword, onDeletePassword} = props
  const {id, nameValue, passwordValue, websiteValue} = eachItem
  const initial = nameValue[0].toUpperCase()
  const onClickDeleteBtn = () => {
    onDeletePassword(id)
  }
  return (
    <li className="each-password-card" key={id}>
      <h1 className="initial">{initial}</h1>
      <div className="details-card">
        <p className="website">{websiteValue}</p>
        <p className="name">{nameValue}</p>
        {showpassword && <p className="password">{passwordValue}</p>}
        {!showpassword && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onClickDeleteBtn}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}
export default PasswordCard
