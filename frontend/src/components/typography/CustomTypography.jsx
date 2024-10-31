import { Typography } from "@mui/material"

const CustomTypography
    = ({ children, fontSize, ...props }) => {
        return <Typography
            {...props}
            sx={{ '&.MuiTypography-root': { fontSize: fontSize } }}
        >
            {children}
        </Typography>
    }

CustomTypography.propTypes

export default CustomTypography;



