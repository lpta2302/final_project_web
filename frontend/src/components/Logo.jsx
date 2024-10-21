/* eslint-disable react/prop-types */
import { Typography } from "@mui/material"

function Logo({ margin, variant }) {
    return (
        <Typography variant={variant || "h5"} sx={{ m: margin, fontFamily: 'Nunito', color: 'primary.main', fontWeight: 'bold' }}>
            FCOMPUTER
        </Typography>
    )
}


export default Logo