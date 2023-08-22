import { Box } from "@mui/material"
import classes from './mobile.module.css'
import ClearIcon from '@mui/icons-material/Clear';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDrag, useDrop} from 'react-dnd'
import { useRef } from "react";

const Card = ({card, setCards}) => {

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

    const moveCard = (card,car) => {
        setCards(prevList => {
            return prevList.map(c => {
                if (card.url === '' ) return c
                if (c.id === card.id) return {...c, url: car.url}
                if (c.id === car.id) return {...c, url: card.url}
                return c
            })
        })
    }

    const [{isDragging}, dragRef] = useDrag({
        type: 'card',
        item:{...card},
        collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    })

    const [{isOver}, dropRef] = useDrop({
        accept: 'card',
        drop: (car) => {
            moveCard(card, car)
        },
        collect: (monitor) => ({
          isOver: !monitor.isOver(),
        }),
    })

    const ref = useRef(null)
    dragRef(dropRef(ref))
    const styles = {boxShadow: isDragging? '0 0 0 5px teal' : isOver? '' : '0 0 0 5px red',}
    return (
    <Box
        className={classes.cardItem} 
        ref={ref}
        sx={styles}
        >
            <label
                htmlFor={!card.url ? card.id : ''}
                style={{backgroundImage: `url(${card.url})`}}
                className={classes.label}
            >
                <input
                    hidden
                    type='file'
                    accept='image/*'
                    onChange={(e) => setFile(e, card)}
                    id={card.id}
                />
                {card.url || <CameraAltIcon sx={{fontSize: '35px'}}/>}
            </label>
        {card.url && <ClearIcon className={classes.clear} onClick={() => onRemove(card)}/> }                    
    </Box>
  )
}

export default Card