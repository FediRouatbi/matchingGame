export const generateArrayOfRandomNumbers = (num: number): { number: number, status: boolean }[] => {
    const numbers: number[] = [];
    let i: number = 0;
    while (i < num) {
        const randomNumber = Math.round(Math.random() * 400)
        if (numbers.includes(randomNumber)) continue
        numbers.push(randomNumber);
        i++;
    }

    const data = [...numbers, ...numbers].sort(() => 0.5 - Math.random());

    return data.map(number => ({ number, status: false }))
}


export const checkActiveCards = (grid: { number: number, status: boolean }[]) => {

    const activeCards = grid.filter(el => el.status === true).map(el => el.number).sort();
    let cards = []
    for (let i = 0; i < activeCards.length; i++) {
        if (activeCards[i] === activeCards[i + 1] || activeCards[i] === activeCards[i - 1]) continue
        cards.push(activeCards[i])
    }
    return cards
}

