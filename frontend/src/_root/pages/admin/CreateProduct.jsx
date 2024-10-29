import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid2, Paper, Radio, RadioGroup, styled, TextField, Typography } from "@mui/material"
import PageToolbar from "../../../components/pageContainer/PageToolbar"
import CustomPageContainer from "../../../components/pageContainer/CustomPageContainer"
import { AspectRatio, Autocomplete, CssVarsProvider, extendTheme, useTheme } from '@mui/joy'

const breadcrumbs = [
  { path: '/', title: 'Home' },
  { path: '/manage-product', title: 'Quản lý sản phẩm' },
  { path: '/manag-product/create-product', title: 'Thêm sản phẩm mới' }
]

const joyTheme = extendTheme();

function CreateProduct() {

  return (
    <CustomPageContainer
      breadCrumbs={breadcrumbs}
      title='Thêm sản phẩm mới'
      slots={{ toolbar: PageToolbar }}
      slotProps={{ toolbar: { handleSave: () => 1, handleSaveDraft: () => 1, handleDelete: () => 1 } }}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }} sx={{}}>
          <Box p={3} borderRadius={4} bgcolor="grey.100">
            <Typography variant="body">Mô tả sản phẩm</Typography>
            <TextField label="Tên sản phẩm" fullWidth margin="normal" placeholder="Macbook pro M4, Samsung Galaxy S22,..." />
            <TextField label="Mô tả sản phẩm" fullWidth multiline rows={4} margin="normal" placeholder="Mô tả sản phẩm..." />
            <Box display="flex" justifyContent="space-between" mt={2}>
              {/* Size */}

            </Box>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 4 }}>
          <Box p={3} borderRadius={2} bgcolor="grey.100" display="flex" flexDirection="column" alignItems="center">
            <Typography variant="body" sx={{ '&.MuiTypography-root': { fontSize: '1.4rem' } }}>Ảnh sản phẩm</Typography>
            {/* Placeholder for Image */}
            <AspectRatio
              ratio="1" sx={{ width: '100%' }}
            >
              <Box
                component="img"
                alt="Product Image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Makes sure the image covers the square box
                  borderRadius: 2,   // Optional: for rounded corners
                  backgroundColor: 'grey.300'
                }}
              />
            </AspectRatio>
            {/* Thumbnails */}
            <Box display="flex" gap={1} mt={2}>
              <Box width="50px" height="50px" bgcolor="grey.300" borderRadius={1}></Box>
              <Box width="50px" height="50px" bgcolor="grey.300" borderRadius={1}></Box>
              <Box width="50px" height="50px" bgcolor="grey.300" borderRadius={1}></Box>
              <Box width="50px" height="50px" bgcolor="grey.300" borderRadius={1}></Box>
            </Box>
          </Box>
          <Grid2 item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Pricing And Stock</Typography>
              <Grid2 container spacing={2} sx={{ mt: 2 }}>
                <Grid2 item xs={6}>
                  <TextField label="Base Pricing" fullWidth />
                </Grid2>
                <Grid2 item xs={6}>
                  <TextField label="Stock" fullWidth />
                </Grid2>
                <Grid2 item xs={6}>
                  <TextField label="Discount" fullWidth />
                </Grid2>
                <Grid2 item xs={6}>
                  <TextField label="Discount Type" fullWidth />
                </Grid2>
              </Grid2>
            </Paper>
          </Grid2>
          {/* Category Section */}
          <Grid2 item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Category</Typography>
              <CssVarsProvider theme={joyTheme}>

                <Autocomplete
                  variant="soft"
                  placeholder="Soft variant"
                  options={["hello", 'xinchao']}
                />
              </CssVarsProvider>

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Category
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Grid2>
    </CustomPageContainer>
  )
}

export default CreateProduct