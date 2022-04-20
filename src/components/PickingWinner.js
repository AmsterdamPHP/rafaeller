import React from "react"
import Avatar from "./Avatar";

const pickRandom = (count, exclude) => {
  const index = Math.floor((Math.random() * count))

  if (typeof exclude !== 'undefined' && exclude === index) {
    // Exclude the previous index so we don't get the same avatar showing up back to back
    // That would just look like the animation is lagging
    return pickRandom(count, exclude)
  }

  return index
}

const countdownTime = 7500
const itemGet = new Audio(process.env.PUBLIC_URL + '/item-get.mp3')

const reset = (setElapsed, setPickingWinner) => {
  itemGet.pause()
  itemGet.currentTime=0
  setPickingWinner(false)
  setElapsed(0)
}

const PickingWinner = (props) => {
  const {players, setPickingWinner} = props
  const [index, setIndex] = React.useState(0)
  const [elapsed, setElapsed] = React.useState(0)

  React.useEffect(() => {
    itemGet.play()
  }, [])

  React.useEffect(() => {
    if (elapsed >= countdownTime) {
      reset(setElapsed, setPickingWinner)
      return;
    }

    const interval = elapsed < 2500 ? 1000 : 1000 * Math.pow(0.5,((elapsed / 1000) - 3))
    const id = window.setTimeout(() => {
      setElapsed(elapsed + interval)
      setIndex(pickRandom(players.length, index))
    }, interval)

    return () => window.clearTimeout(id)
  }, [index])

  return (
    <Avatar
      svg={ players[index].avatar }
    />
  )
}

export default PickingWinner
