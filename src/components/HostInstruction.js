const HostInstruction = (props) => {

  return (
    <span className="host-instruction">
      press <strong>[space]</strong> to pick {props.winnerPicked ? 'another' : 'a'} winner.
    </span>
  )
}

export default HostInstruction