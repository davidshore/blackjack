import React from "react"
import { cards } from "../cards"
import "./game.css"

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: "",
      userPlaying: true,
      dealerPlaying: false,
      userCards: [],
      dealerCards: []
    }
  }
  /* eslint-disable react/no-did-update-set-state */
  componentDidUpdate() {
    if (this.state.userPlaying) {
      if (this.sumOfCards(this.state.userCards) > 21) {
        this.setState({ message: "You loose", userPlaying: false, dealerPlaying: false })
      }
    } else if (this.state.dealerPlaying) {
      this.newDealerCard()
      const sumDealerCards = this.sumOfCards(this.state.dealerCards)
      const sumUserCards = this.sumOfCards(this.state.userCards)
      if (sumDealerCards > 21) {
        this.setState({ message: "You win", userPlaying: false, dealerPlaying: false })
      } else if (sumDealerCards > 17) {
        if (sumDealerCards > sumUserCards) {
          this.setState({ message: "You loose" })
        } else if (sumDealerCards < sumUserCards) {
          this.setState({ message: "You win" })
        } else {
          this.setState({ message: "Draw!" })
        }
        this.setState({ userPlaying: false, dealerPlaying: false })
      }
    }
  }

  getRandom() {
    const random = Math.random() // number between 0.0 and 0.999999
    const random2 = random * 52 // number between 0.0 and 51.99999
    return Math.floor(random2)
  }

  newUserCard() {
    const rand = this.getRandom()
    const card = cards[rand]
    const { userCards } = this.state
    userCards.push(card)
    this.setState({ userCards })
  }

  /* eslint-disable global-require */
  /* eslint-disable import/no-dynamic-require */
  renderCards(playerCards) {
    return playerCards.map(card =>
      <div className="card">
        <img alt="" src={require(`../images/${card.file}`)} />
      </div>)
  }
  /* eslint-enable global-require */
  /* eslint-enable import/no-dynamic-require */

  newDealerCard() {
    const rand = this.getRandom()
    const card = cards[rand]
    const { dealerCards } = this.state
    dealerCards.push(card)
    this.setState({ dealerCards })
  }

  sumOfCards(playerCards) {
    let sum = 0
    playerCards.forEach(card => {
      sum += card.num
    })
    return sum
  }

  stopPlaying() {
    this.setState({ userPlaying: false, dealerPlaying: true })
  }

  render() {
    return (
      <div>
        <div className="message" >
          {this.state.message}
        </div>
        <div className="buttons" >
          <button
            disabled={!this.state.userPlaying}
            onClick={() => this.newUserCard()} >New card?
          </button>
          <button
            disabled={!this.state.userPlaying}
            onClick={() => this.stopPlaying()}>Stop
          </button>
        </div>
        <div className="cards" >
          {this.renderCards(this.state.userCards)}
        </div>
        <div className="cards" >
          {this.renderCards(this.state.dealerCards)}
        </div>
      </div>
    )
  }

}

export default Game
