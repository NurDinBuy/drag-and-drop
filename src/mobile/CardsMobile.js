import React from 'react'
import Card from './Card'


const CardsMobile = (props) => {
    const {cards, setCards} = props

    const sortCards = a => a.url !== '' ? -1 : 1
    
    return (
        <>
        {
        cards.sort(sortCards).map(card => <Card card={card} key={card.id} setCards={setCards}/>)
        }
        </>
    )
}

export default CardsMobile
