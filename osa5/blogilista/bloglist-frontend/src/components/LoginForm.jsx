const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} name="username" placeholder="username"/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} name="password" placeholder="password"/>
        </div>
        <button type="submit">log in</button>
      </form>
    </>
  )
}

export default LoginForm