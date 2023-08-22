import React from 'react'
import {Box} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import classes from './desktop.module.css'

const Cards = (props) => {
    const {dragEndHandler, dropHandler, dragOverHandler, setCards, dragStartHandler, cards} = props

    const setFile = (e, card) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setCards(prevList => {
                return prevList.map(c => {
                    if (card.id === c.id) {
                        c.url = reader.result
                        return c
                    }
                    return c
                })
            })
        }
    }

    const onRemove = (card) => {
        setCards(prevList => {
            return prevList.map(c => {
                if (card.id === c.id) {
                    c.url = ''
                    return c
                }
                return c
            })
        })
    }
    const sortCards = a => a.url !== '' ? -1 : 1

    return (
        <>
        {
            cards.sort(sortCards).map(card => {
                return(
                <Box
                    key={card.id}
                    className={classes.cardsItem}                    
                >
                    <label
                        htmlFor={!card.url ? card.id : ''}
                        className={classes.label}
                        style={{backgroundImage: `url(${card.url})`}}
                        onDragStart={() => dragStartHandler(card)}
                        onDrop={(e) => dropHandler(e, card)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        draggable={card.url && true}
                    >
                        <input
                            id={card.id}
                            type='file'
                            hidden
                            accept='image/*'
                            onChange={e => setFile(e, card)}
                        />
                    {card.url ? '' : <CameraAltIcon sx={{fontSize: '35px'}}/>}
                    </label>
                    {card.url ? <ClearIcon className={classes.clear} onClick={() => onRemove(card)}/> : ''}                    
                </Box>)
            })
        }
        </>
    )
}

export default Cards