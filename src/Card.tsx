type CardProps = {
  num: number,
  cardisActive: boolean,
  lastClick: (number: number) => void,
  index: number,
  flipCard: (num: number) => boolean
}


export default function Card({ num, cardisActive, lastClick, index, flipCard }: CardProps) {
  const handelCardCLick = () => {
    if (cardisActive) return
    const oneCardIsOpen = flipCard(index)
    if (oneCardIsOpen) lastClick(num)
  }

  return (<div className={`card ${cardisActive ? "rotate" : ""}`}
    onClick={handelCardCLick}>
    <div className="backCard">?</div>
    <img className="img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`} />
  </div >)
}