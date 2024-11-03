import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import PropTypes, { elementType } from "prop-types"

const validateNumber = (event) => {
  if (
    !/[0-9]/.test(event.key) &&
    event.key !== 'Backspace' &&
    event.key !== 'Delete' &&
    event.key !== 'ArrowLeft' &&
    event.key !== 'ArrowRight' &&
    event.key !== 'Tab' &&
    event.key !== '.'
  ) {
    event.preventDefault();
  }
}


const elements = {
  string: (value, onChange, label, placeholder) => (
    <TextField
      value={value}
      onChange={onChange}
      label={label} fullWidth placeholder={placeholder} />
  ),
  number: (value, onChange, label, placeholder) => (
    <TextField
      label={label}
      type="number"
      variant="outlined"
      value={value}
      onChange={(event) => {
        const newValue = event.target.value
        if (newValue < 0)
          return;
        onChange(event);
      }}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      onKeyDown={validateNumber}
      margin="normal"
      placeholder={placeholder}
    />
  ),
  numberGroup: ({ items }) => (
    <Box
      display='inline-flex'
      width="100%"
      gap={1}
      justifyContent='space-between'
    >
      {Object.keys(items).map((key, index) => {
        const { label, value, onChange, placeholder } = items[key];
        return (
          <TextField
            key={index}
            label={label}
            type="number"
            variant="outlined"
            value={value}
            onChange={(event) => {
              const newValue = event.target.value
              if (newValue < 0)
                return;
              onChange(event);
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onKeyDown={validateNumber}
            margin="normal"
            placeholder={placeholder}
          />)
      })}
    </Box>
  ),
}

function FilterDrawer({ filterList, toggleDrawer }) {
  return (
    <Box
      sx={{ width: { md: '40vw', xs: '80vw' }, px: 1 }}
      role="presentation"
    >
      <List>
        {Object.keys(filterList).map((key, index) => (
          (<>

            <ListItem key={index} disablePadding>
              {elements[filterList[key].type](filterList[key])}
            </ListItem>
            <Divider key={index + 0.5} />

          </>
          )
        ))}
      </List>
    </Box>
  )
}

FilterDrawer.propTypes = {
  filterList: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func
}

export default FilterDrawer