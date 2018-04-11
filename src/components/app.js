import React from "react"
import Game from "./game"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playingGame: false
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Black Jack</h1>
        {
          this.state.playingGame ?
            <Game /> :
            <button
              onClick={() => {
                this.setState({ playingGame: true })
              }
              } >Start new game
            </button>
        }
      </div>
    )
  }
}

export default App
