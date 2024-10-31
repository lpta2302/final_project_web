import { Autocomplete, CssVarsProvider, extendTheme } from '@mui/joy';
import { useGridApiContext } from '@mui/x-data-grid';

const joyTheme = extendTheme();

const CustomEditDropdownCell = (props) => {

  const { id, value, field, options } = props;
  const apiRef = useGridApiContext();

  const handleChange = (event, newValue) => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: newValue
    })

    // setSelectedValue(newValue);
  };

  return (
    <CssVarsProvider theme={joyTheme}>
      <Autocomplete options={options} value={value} onChange={handleChange} />
    </CssVarsProvider>
  );
};

export default CustomEditDropdownCell