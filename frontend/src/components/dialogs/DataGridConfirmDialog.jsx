import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

function DataGridConfirmDialog({ state, onClick, title, content }) {
    return (
        <Dialog
            maxWidth="md"
            open={state}
            keepMounted
            onClose={onClick}
        >
            <DialogTitle>{title || 'Are you sure?'} </DialogTitle>
            <DialogContent dividers>
                {content || `Warning: The user and his data will be permanently deleted.`}
            </DialogContent>
            <DialogActions>
                <Button sx={{mr: '0.5rem'}} variant='outlined' onClick={() => onClick(false)}>
                    No
                </Button>
                <Button variant='contained' onClick={() => onClick(true)}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

DataGridConfirmDialog.propTypes = {
    state: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    content: PropTypes.string
}

export default DataGridConfirmDialog