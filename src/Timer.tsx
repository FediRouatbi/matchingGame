import { useEffect, useState } from "react";
type TimerProps = {
  activeTimer: boolean,
  reset: boolean
}
export default function Timer({ activeTimer, reset }: TimerProps) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const resetTimer = () => {
    setSec(0)
    setMin(0)
  }
  useEffect(() => {
    if (reset && !activeTimer) resetTimer()
    let addSecond: any = null;
    addSecond = setInterval(() => {
      setSec((sec) => {
        if (sec !== 59)
          return sec + 1
        else setMin(min => min + 1)
        return sec = 0
      });

    }, 1000)
    if (!activeTimer) clearInterval(addSecond)
    return () => clearInterval(addSecond)
  }, [activeTimer, reset])


  return <div className="timer">{min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}</div>

}