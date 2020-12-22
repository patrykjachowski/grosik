import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Menu from '@material-ui/core/Menu'
import TableCell from '@material-ui/core/TableCell'
import AddIcon from '@material-ui/icons/Add'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from "@material-ui/core/Fab";

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
]

export default function CategoriesRowEdit() {
    // const [anchorEl, setAnchorEl] = React.useState(null)
    // const open = Boolean(anchorEl)

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget)
    // }
    //
    // const handleClose = () => {
    //     setAnchorEl(null)
    // }
    //
    return (
        <>
            {/*<IconButton*/}
            {/*    aria-label="more"*/}
            {/*    aria-controls="long-menu"*/}
            {/*    aria-haspopup="true"*/}
            {/*    onClick={handleClick}*/}
            {/*>*/}
            {/*    <AddIcon />*/}
            {/*</IconButton>*/}
            <Fab size="small" color="default" aria-label="add subcategory" onClick={handleClick}>
                <AddIcon />
            </Fab>
            {/*<Menu*/}
            {/*    id="long-menu"*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    keepMounted*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*>*/}
            {/*    /!*{options.map((option) => (*!/*/}
            {/*        <MenuItem*/}
            {/*            key={'option'}*/}
            {/*            // selected={option === 'Pyxis'}*/}
            {/*            onClick={handleClose}*/}
            {/*        >*/}
            {/*            New subcategory*/}
            {/*        </MenuItem>*/}
            {/*    /!*))}*!/*/}
            {/*</Menu>*/}
        </>
    )
}
