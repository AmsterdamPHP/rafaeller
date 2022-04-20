import Avatar from "./Avatar";
import React from "react";

const winnerSound = new Audio(process.env.PUBLIC_URL + '/item-get.mp3')

const Winner = (props) => {
  const { winner } = props
  winnerSound.currentTime = 8
  winnerSound.play()
  return (
    <React.Fragment>
      <Avatar className="winner" svg={winner.avatar} />
      <span className="winner-text">
        🏆 {winner.username}!
      </span>
    </React.Fragment>
  )
}

export default Winner