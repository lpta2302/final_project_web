import { Accordion, AccordionSummary, Box, Button, Divider, FormControl, FormHelperText, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { CustomTypography, NumberInput } from "../../../components"
import PageToolbar from "../../../components/pageContainer/PageToolbar"
import CustomPageContainer from "../../../components/pageContainer/CustomPageContainer"
import { AspectRatio, Autocomplete, createFilterOptions, CssVarsProvider, extendTheme } from '@mui/joy'
import { useReadAllBrandAdmin, useReadAllCategory, useReadAllSpecificationKeyAdmin, useReadAllTagAdmin } from "../../../api/queries"
import { useState } from "react"
import SpecificationDataGrid from "./createProduct/SpecificationDataGrid"
import { ArrowDropDown, Delete, Image } from "@mui/icons-material"

const breadcrumbs = [
  { path: '/', title: 'Home' },
  { path: '/manage-product', title: 'Quản lý sản phẩm' },
  { path: '/manag-product/create-product', title: 'Thêm sản phẩm mới' }
]

const joyTheme = extendTheme();

const filterCategoryOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.categoryName,
})
const filterTagOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.categoryName,
})
const filterBrandOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.brandName,
})

const initErrorState = {
  productName: '',
  discription: '',
  variants: {
    emptyMessage: '',

  }
}


function CreateProduct() {
  const [variants, setVariants] = useState([{price: 0, specifications: []}])
  const [productName, setProductName] = useState('');
  const [discription, setDiscription] = useState('')
  const [tag, setTag] = useState()
  const [brand, setBrand] = useState()
  const [category, setCategory] = useState()
  const [formErrors, setFormErrors] = useState(initErrorState)

  const { data: categories, isLoading: isLoadingCategories } = useReadAllCategory();
  const { data: tags, isLoading: isLoadingTag } = useReadAllTagAdmin();
  const { data: brands, isLoading: isLoadingBrand } = useReadAllBrandAdmin();
  const { data: specificatinKeys, isLoading: isLoadingSpecificationKeys } = useReadAllSpecificationKeyAdmin();
  
  
  const setSpecifications = (index, newSpecs) => {
    setVariants(prevVariants => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = { ...updatedVariants[index], specifications: newSpecs };
      return updatedVariants;
    });
  };

  const setPrice = (index, newPrice) => {
    setVariants(prevVariants => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = { ...updatedVariants[index], price: newPrice };
      return updatedVariants;
    });
  };

  const handleSave = () => {
    const errors = {...JSON.parse(JSON.stringify(initErrorState))};
    const savedVariants = variants.filter((variant,index)=>{
      const enoughData = variant.specifications.length > 0
      if(!enoughData)
        errors.variants[index] = "Phải có ít nhất 1 thông số sản phẩm"
      return enoughData
    })

    if ( !productName || productName.trim() === "") {
      errors.productName = "Tên sản phẩm không được bỏ trống"
    }
    if ( !discription || discription.trim() === "") {
      errors.discription = "Mô tả sản phẩm không được bỏ trống"
    }
    if (  variants.length === 0){
      errors.variants.emptyMessage = "Phải có ít nhất 1 phân loại của sản phẩm hợp lệ"
    }

    setFormErrors(errors);

    console.log(errors);
    

    console.log({
      productName,
      discription,
      category,
      tag,
      brand,
      savedVariants
    });
    


  }

  return (
    <CustomPageContainer
      breadCrumbs={breadcrumbs}
      title='Thêm sản phẩm mới'
      slots={{ toolbar: PageToolbar }}
      slotProps={{ toolbar: { handleSave: handleSave, handleSaveDraft: () => 1, handleDelete: () => 1 } }}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }} sx={{}}>
          <Box p={3} borderRadius={4} sx={{boxShadow: 3}}>
            <CustomTypography fontSize="1.2rem" variant="caption">Mô tả sản phẩm</CustomTypography>
            <TextField
              error={!!formErrors.productName}
              helperText={formErrors.productName}
              name="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              label="Tên sản phẩm" fullWidth margin="normal" placeholder="Macbook pro M4, Samsung Galaxy S22,..." />
            <TextField
              error={!!formErrors.discription}
              helperText={formErrors.discription}
              name="product-discription"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              label="Mô tả sản phẩm" fullWidth multiline rows={4} margin="normal" placeholder="Mô tả sản phẩm..." />
            <Box display="flex" justifyContent="space-between" mt={1}>
              {/* Size */}

            </Box>
          </Box>
          <Box mt={1} p={3} borderRadius={4} sx={{boxShadow: 3}}>
            <Box width="100%" display="flex" justifyContent="space-between" py={2}>
              <CustomTypography fontSize="1.2rem" variant="caption">
                Thông số sản phẩm
              </CustomTypography>
              <Button
                variant="outlined"
                onClick={() => setVariants(prev => [...prev, { price: 0, specifications: [] }])}
              >
                <Typography>Thêm biến thể mới</Typography>
              </Button>
            </Box>
            {variants && variants.map((variant, index) => (
              <Accordion sx={{ mb: 1 }} key={index}>
                <AccordionSummary
                  expandIcon={
                    <ArrowDropDown />
                  }
                >
                  <Box width="100%">
                    <Box display='flex' m={0} p={0} alignItems='center' justifyContent='space-between' width='100%'>
                      <CustomTypography fontSize="1rem" sx={{fontFamily:'inter'}}>{`Loại ${index + 1}`}</CustomTypography>
                      <IconButton
                        onClick={() => { setVariants(prev => prev.filter((_, i) => i !== index)) }}
                        color="error" sx={{ width: '32px', height: '32px' }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                    <FormHelperText error>{!!formErrors.variants[index] && formErrors.variants[index]}</FormHelperText>
                  </Box>
                </AccordionSummary>
                <Box sx={{ p: 2 }}>
                  <TextField
                    label="Giá tiền"
                    type="number"
                    variant="outlined"
                    value={variant.price}
                    onChange={(event) => {
                      const newValue = event.target.value
                      if(newValue < 0)
                        return;
                      setPrice(index, newValue)
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onKeyDown={(event) => {
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
                    }}
                    margin="normal"
                  />
                  <SpecificationDataGrid specificatinKeys={specificatinKeys} specifications={variant.specifications} setSpecifications={newSpecs => setSpecifications(index, newSpecs)} key={index} />
                </Box>
              </Accordion>
            ))}
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 4 }}>
          <Box p={3} borderRadius={2} display="flex" flexDirection="column" alignItems="center" sx={{boxShadow: 3}}>
            <Box display='flex' justifyContent="flex-start" width="100%">
              <CustomTypography fontSize="1.2rem" variant="caption">Ảnh sản phẩm</CustomTypography>
            </Box>
            {/* Placeholder for Image */}
            <CssVarsProvider>
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
                  }}
                />
              </AspectRatio>
            </CssVarsProvider>
            {/* Thumbnails */}
            <Box display="flex" gap={2} mt={1} maxWidth="100%" sx={{overflowX:"auto"}}>
              <Box
                  component="img"
                  alt="Product Image"
                  sx={{
                    width: '68px',
                    height: '68px',
                    objectFit: 'cover', // Makes sure the image covers the square box
                    borderRadius: 2,   // Optional: for rounded corners
                  }}
                  src={"https://placehold.co/400"}
                />
            </Box>
          </Box>
          {/* Category Section */}
          <Box mt={1} p={3} borderRadius={2} display="flex" flexDirection="column" alignItems="center" sx={{boxShadow: 3}}>
            <Box display='flex' justifyContent="flex-start" width="100%">
              <CustomTypography fontSize="1.2rem" variant="caption">Phân loại sản phẩm</CustomTypography>
            </Box>
            <CssVarsProvider theme={joyTheme}>
              <Box width="100%" p={2}>
                <CustomTypography fontSize="1rem" variant="caption">Loại sản phẩm</CustomTypography>
                <Autocomplete
                  value={category}
                  onChange={(event, newValue)=>setCategory(newValue)}
                  variant="plain"
                  placeholder="Loại sản phẩm"
                  options={isLoadingCategories ? [] : categories}
                  getOptionLabel={(option) => option.categoryName}
                  loading={isLoadingCategories}
                  filterOptions={filterCategoryOptions}
                  sx={{
                    "--Input-minHeight": "60px"
                  }}
                />
              </Box>
            </CssVarsProvider>
            <Divider component="div" variant="fullWidth" sx={{ width: '90%' }} />
            <CssVarsProvider theme={joyTheme}>
              <Box width="100%" p={2}>
                <CustomTypography fontSize="1rem" variant="caption">Hãng sản xuất</CustomTypography>
                <Autocomplete
                value={brand}
                onChange={(e,newValue)=>setBrand(newValue)}
                  variant="plain"
                  placeholder="Hãng sản xuất"
                  options={isLoadingBrand ? [] : brands}
                  getOptionLabel={(option) => option.brandName}
                  loading={isLoadingBrand}
                  filterOptions={filterBrandOptions}
                  sx={{
                    "--Input-minHeight": "60px"
                  }}
                />
              </Box>
            </CssVarsProvider>
            <Divider component="div" variant="fullWidth" sx={{ width: '90%' }} />
            <CssVarsProvider theme={joyTheme}>

              <Box width="100%" p={2}>
                <CustomTypography fontSize="1rem" variant="caption">Gắn thẻ</CustomTypography>
                <Autocomplete
                  value={tag}
                  onChange={(e,newValue)=>setTag(newValue)}
                  variant="plain"
                  placeholder="Tag"
                  options={isLoadingTag ? [] : tags}
                  getOptionLabel={(option) => option.tagName}
                  loading={isLoadingTag}
                  filterOptions={filterTagOptions}
                  multiple
                  sx={{
                    "--Input-minHeight": "60px"
                  }}
                />
              </Box>
            </CssVarsProvider>
          </Box>
        </Grid2>
      </Grid2>
    </CustomPageContainer>
  )
}

export default CreateProduct