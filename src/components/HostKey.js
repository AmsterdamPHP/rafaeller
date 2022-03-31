export default function HostKey(props) {

  const {value, onChange, onSubmit, error} = props
  return (
    <form
      id="adminKey"
      onSubmit={onSubmit}
    >
      { error &&
        <span className="error">{error}</span>
      }
      <span>
        <input
          className="blackUnderlined"
          type="password"
          placeholder="Enter host key"
          value={value}
          onChange={onChange}
        />
      <button type="submit">Start</button>
      </span>
    </form>
  )
}