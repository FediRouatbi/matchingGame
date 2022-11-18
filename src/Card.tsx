type CardProps = {
  num: number,
  show: boolean,
  lastClick: (number: number) => void,
  index: number,
  showCard: (num: number) => boolean
}


export default function Card({ num, show, lastClick, index, showCard }: CardProps) {
  const handelCardCLick = () => {
    if (show) return
    const forwoard = showCard(index)
    if (forwoard) lastClick(num)
  }

  return (<div className={`card ${show ? "rotate" : ""}`}
    onClick={handelCardCLick}>
    <div className="backCard">?</div>
    <img className="img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`} />
  </div >)
}