import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {selectErrorMessage, cleanErrorMessage} from "../features/Categories/categoriesSlice";

export default function ErrorPopup() {
    const [open, setOpen] = React.useState(false);
    const errorMessage = useSelector(selectErrorMessage)
    const dispatch = useDispatch()
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(cleanErrorMessage())
    };

    useEffect(()=> {
        if (errorMessage.length) handleClickOpen()
    }, [ errorMessage ])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Błąd usuwania</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}