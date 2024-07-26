import PropTypes from 'prop-types'

const ErrorMessage = ({ errorMessage }) => {
  return <div className="error">{errorMessage}</div>
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
}
export default ErrorMessage
