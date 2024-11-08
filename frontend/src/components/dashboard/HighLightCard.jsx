import { Box, Typography } from "@mui/material"

function HighLightCard({title, value}) {
  return (
    <Box>
      <Typography variant='h4' fontSize={{xs: '1rem', md: '1.5rem'}}>{title}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  )
}

export default HighLightCard