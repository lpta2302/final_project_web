import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function Search() {
    return (
      <FormControl sx={{ width: '100%'}} variant="outlined">
        <OutlinedInput
          size="medium"
          id="search"
          placeholder="Search…"
          color='#000'
          sx={{ 
              backgroundColor: '#eee',
              flexGrow: 1, 
              '& .MuiOutlinedInput-notchedOutline': {
                  fontSize: '16px',
                  borderColor: 'rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease' // Default outline color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.5)', // Outline color when hovered
                  transition: 'all 0.3s ease' // Default outline color
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0,0,0,0.5)',
                  borderWidth:'1',
                  transition: 'all 0.3s ease' // Default outline color
              }
          }}
          startAdornment={
              <InputAdornment position="start"> 
                  <IconButton>
                      <SearchRoundedIcon fontSize='large' sx={{color: '#353535'}}/>
                  </IconButton>
              </InputAdornment>
          }
          inputProps={{
              'aria-label': 'search',
          }}
      />
      </FormControl>
    );
  }