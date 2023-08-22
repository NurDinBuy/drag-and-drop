import React, {useState} from 'react'
import { Box } from '@mui/material'
import classes from './desktop.module.css'
import Cards from './Cards'

const Desktop = () => {
    const [cards, setCards] = useState([
        {id: 1, url: ''},
        {id: 2, url: ''},
        {id: 3, url: ''},
        {id: 4, url: ''},
        {id: 5, url: ''},
        {id: 6, url: ''},
        {id: 7, url: ''},
        {id: 8, url: ''},
        {id: 9, url: ''}
    ])

    const [currentCard, setCurrentCard] = useState(null)


    const dragStartHandler = (card) => setCurrentCard(card)
    const dragOverHandler = (e) => e.preventDefault()
    const dragEndHandler = e => e.preventDefault()

    const dropHandler = (e, card) => {
        e.preventDefault()
        if (!card.url) return null
        setCards(cards.map(c => {
            if (c.url === currentCard.url) return {...c, url: card.url}
            if (c.url === card.url) return {...c, url: currentCard.url}
            return c
        }))
    }


    return (
        <Box className={classes.app}>
            <Cards
                dragStartHandler={dragStartHandler}
                dragOverHandler={dragOverHandler}
                dragEndHandler={dragEndHandler}
                dropHandler={dropHandler}
                cards={cards}
                setCards={setCards}

            />
        </Box>
    )
}

export default Desktop