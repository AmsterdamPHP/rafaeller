export default function HostKey(props) {

  const {value, onChange, onSubmit} = props
  return (
    <form
      id="adminKey"
      onSubmit={onSubmit}
    >
      <input
        className="blackUnderlined"
        type="password"
        placeholder="Enter host key"
        value={value}
        onChange={onChange}
      />
      <button type="submit">Start</button>
    </form>
  )
}