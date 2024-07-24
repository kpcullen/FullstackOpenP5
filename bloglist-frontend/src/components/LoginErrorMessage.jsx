import PropTypes from 'prop-types'

const LoginErrorMessage = ({ loginErrorMessage }) => {
  return <div className="error">{`Login failed. ${loginErrorMessage}.`}</div>
}

LoginErrorMessage.propTypes = {
  loginErrorMessage: PropTypes.string.isRequired,
}

export default LoginErrorMessage
