import { Save } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { PageContainerToolbar } from "@toolpad/core"

function PageToolbar() {
  return (
    <PageContainerToolbar>
        <Button
            startIcon={<Save/>}
            variant="contained"
            color="primary.main"
        >
            <Typography
                variant="button"
            >
                Save
            </Typography>
        </Button>
    </PageContainerToolbar>
  )
}

export default PageToolbar