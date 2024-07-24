import PropTypes from 'prop-types'

const SuccessMessage = ({ successMessage }) => {
  return <div className="success">{successMessage}</div>
}

SuccessMessage.propTypes = {
  successMessage: PropTypes.string.isRequired,
}

export default SuccessMessage
