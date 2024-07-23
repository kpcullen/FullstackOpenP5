const LoginErrorMessage = ({ loginErrorMessage }) => {
  return <div className="error">{`Login failed. ${loginErrorMessage}.`}</div>
}

export default LoginErrorMessage
