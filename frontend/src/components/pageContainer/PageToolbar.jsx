import { DeleteOutlined, Done, Save } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { PageContainerToolbar } from "@toolpad/core"

function PageToolbar({ handleSave, handleSaveDraft, handleDelete, disabled }) {
    return (
        <Box
            sx={{ display: { md: 'inline-flex', xs: 'none' }, gap: '8px', ml: 'auto' }}
        >
            <Button
                startIcon={<DeleteOutlined />}
                variant="outlined"
                color="error"
                onClick={handleDelete}
                sx={{ borderRadius: '25px' }}
            >
                <Typography
                    variant="button"
                >
                    Delete
                </Typography>
            </Button>
            <Button
                startIcon={<Save />}
                variant="outlined"
                color="primary"
                onClick={handleSaveDraft}
                sx={{ borderRadius: '25px' }}

            >
                <Typography
                    variant="button"
                >
                    Save Draft
                </Typography>
            </Button>
            <Button
                startIcon={<Done />}
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ borderRadius: '25px' }}
                disabled={disabled}
            >
                <Typography
                    variant="button"
                >
                    Save
                </Typography>
            </Button>
        </Box>
    )
}

export default PageToolbar