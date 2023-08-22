import React, {useState} from 'react'
import { Box } from '@mui/material'
import {DndProvider} from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import CardsMobile from './CardsMobile'
import classes from './mobile.module.css'

const Mobile = () => {
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

    return (
        <DndProvider backend={TouchBackend}>
            <Box className={classes.app}>
                <CardsMobile
                    cards={cards}
                    setCards={setCards}
                />
            </Box>
        </DndProvider>
    )
}

export default Mobile

