import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function DataGridConfirmDialog({ state, onClick, title, content }) {
    useEffect(() => {
        const handleKeyDown = async (e) => {
          if (e.key === 'Enter') {
            console.log("Enter key pressed");
            await onClick(true); 
          }
        };
    
        if (state) {
          document.addEventListener('keydown', handleKeyDown);
        }
        
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [state, onClick]);


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
                <Button sx={{ mr: '0.5rem' }} variant='outlined' onClick={() => onClick(false)}>
                    No
                </Button>
                <Button variant='contained' onClick={() => onClick(true)} autoFocus>Yes</Button>
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