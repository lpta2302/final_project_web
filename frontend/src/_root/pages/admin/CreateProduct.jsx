
import { Accordion, AccordionSummary, Box, Button, Divider, FormControl, FormHelperText, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { CustomTypography, NumberInput } from "../../../components"
import PageToolbar from "../../../components/pageContainer/PageToolbar"
import CustomPageContainer from "../../../components/pageContainer/CustomPageContainer"
import { AspectRatio, Autocomplete, createFilterOptions, CssVarsProvider, extendTheme } from '@mui/joy'
import { useCreateProduct, useReadAllBrandAdmin, useReadAllCategory, useReadAllSpecificationKeyAdmin, useReadAllTagAdmin } from "../../../api/queries"
import { useEffect, useState } from "react"
import SpecificationDataGrid from "./createProduct/SpecificationDataGrid"
import { ArrowDropDown, Block, Delete, DeleteOutlined, Image } from "@mui/icons-material"
import { FileUploader } from 'react-drag-drop-files'
import { AddImage } from "../../../assets"
import { enqueueSnackbar as toaster } from "notistack"
import SKUField from "./createProduct/SKUField"

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
  productCode: '',
  productName: '',
  description: '',
  variants: {
    emptyMessage: '',

  },
  isNew: true
}

const fileTypes = ["JPG", "PNG", "JEPG", "WEBP", "MP4"];

function CreateProduct() {
  const [variants, setVariants] = useState([{ price: 0, specifications: [], specCode: '' }])
  const [productCode, setProductCode] = useState('')
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState()
  const [brand, setBrand] = useState()
  const [category, setCategory] = useState()
  const [formErrors, setFormErrors] = useState(initErrorState)

  const [files, setFiles] = useState([])
  const [showingFile, setShowingFile] = useState(0)

  const { data: categories, isLoading: isLoadingCategories } = useReadAllCategory();
  const { data: tags, isLoading: isLoadingTag } = useReadAllTagAdmin();
  const { data: brands, isLoading: isLoadingBrand } = useReadAllBrandAdmin();
  const { data: specificatinKeys, } = useReadAllSpecificationKeyAdmin();
  const { mutateAsync: createProduct } = useCreateProduct();


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
  const setSpecCode = (index, newspecCode) => {
    setVariants(prevVariants => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = { ...updatedVariants[index], specCode: newspecCode };
      return updatedVariants;
    });
  };

  const validateForm = () => {
    return !!productCode && !!productName && !!description && variants.filter(variant => variant.specifications.length > 0).length >= 1;
  }

  const handleSave = () => {
    const errors = { ...JSON.parse(JSON.stringify(initErrorState)) };
    const savedVariants = variants.filter((variant, index) => {
      const enoughData = variant.specifications.length > 0
      if (!enoughData)
        errors.variants[index] = "Phải có ít nhất 1 thông số sản phẩm"
      return enoughData
    })

    setFormErrors(errors);
    console.log(savedVariants);

    if (!validateForm())
      toaster({ variant: 'error', message: 'Lưu sản phẩm thất bại' })
    else {
      createProduct({
        productCode,
        productName,
        description,
        category: category._id,
        tag: JSON.stringify(tag),
        brand: brand._id,
        specs: JSON.stringify(savedVariants),
        productStatus: 'active'
      })
    }

    console.log({
      productCode,
      productName,
      description,
      category,
      tag,
      brand,
      specs: savedVariants,
      productStatus: 'active'
    });



  }

  const handleChangeFile = (file) => {
    setFiles(prev => [...prev, file]);
    setShowingFile(files.length);
  }

  const handleDeleteFile = () => {
    setFiles(prev => prev.filter((e, i) => i != showingFile));
    setShowingFile(prev => Math.max(0, --prev));
  }

  useEffect(() => {
    console.log(files)
  }, [files]);

  return (
    <CustomPageContainer
      breadCrumbs={breadcrumbs}
      title='Thêm sản phẩm mới'
      slots={{ toolbar: PageToolbar }}
      slotProps={{ toolbar: { handleSave: handleSave, handleSaveDraft: () => 1, handleDelete: () => 1, disabled: !validateForm() } }}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }} sx={{}}>
          <Box p={3} borderRadius={4} sx={{ boxShadow: 3 }}>
            <CustomTypography component="div" fontSize="1.2rem" variant="caption">Mô tả sản phẩm</CustomTypography>
            <TextField
              sx={{ display: 'flex', width: '30%' }}
              error={!!formErrors.productCode}
              helperText={formErrors.productCode}
              name="product-code"
              value={productCode}
              onChange={(e) => {
                if (!e.target.value || e.target.value.trim() === "")
                  setFormErrors(prev => ({ ...prev, productCode: 'Mã không được bỏ trống' }))
                else
                  setFormErrors(prev => ({ ...prev, productCode: '' }))

                setProductCode(e.target.value)
              }}
              label="Mã sản phẩm" fullWidth margin="normal" placeholder="PC001" />
            <TextField
              sx={{ display: 'flex', width: '80%' }}
              error={!!formErrors.productName}
              helperText={formErrors.productName}
              name="product-name"
              value={productName}
              onChange={(e) => {
                if (!e.target.value || e.target.value.trim() === "")
                  setFormErrors(prev => ({ ...prev, productName: 'Tên sản phẩm không được bỏ trống' }))
                else
                  setFormErrors(prev => ({ ...prev, productName: '' }))

                setProductName(e.target.value)
              }}
              label="Tên sản phẩm" fullWidth margin="normal" placeholder="Macbook pro M4, Samsung Galaxy S22,..." />
            <TextField
              error={!!formErrors.description}
              helperText={formErrors.description}
              name="product-description"
              value={description}
              onChange={(e) => {
                if (!e.target.value || e.target.value.trim() === "")
                  setFormErrors(prev => ({ ...prev, description: 'Mô tả sản phẩm không được bỏ trống' }))
                else
                  setFormErrors(prev => ({ ...prev, description: '' }))
                setDescription(e.target.value)
              }}
              label="Mô tả sản phẩm" fullWidth multiline rows={4} margin="normal" placeholder="Mô tả sản phẩm..." />
            <Box display="flex" justifyContent="space-between" mt={1}>
              {/* Size */}

            </Box>
          </Box>
          <Box mt={1} p={3} borderRadius={4} sx={{ boxShadow: 3 }}>
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
                      {/* <TextField 
                        variant="standard"
                        label="SKU"
                        value={variant.specCode === '' ? productCode+`_${(index+1+'').padStart(3,'0')}` : variant.specCode}
                        onChange={(e)=>setSpecCode(index, e.target.value === '' ? productCode+`_${(index+1+'').padStart(3,'0')}` : e.target.value)}
                      /> */}
                      <SKUField productCode={productCode} variant={variant} index={index} setSpecCode={setSpecCode} />
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
                  <NumberInput
                    value={variant.price}
                    min={0}
                    onChange={
                      (event) => {
                        const newValue = event.target.value
                        if (newValue < 0)
                          return;
                        setPrice(index, newValue)
                      }
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    margin="normal"

                  />
                  <SpecificationDataGrid
                    specificatinKeys={specificatinKeys}
                    specifications={variant.specifications}
                    setSpecifications={newSpecs => {
                      setSpecifications(index, newSpecs)
                    }} key={index} />
                </Box>
              </Accordion>
            ))}
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 4 }}>
          <Box p={3} borderRadius={2} display="flex" flexDirection="column" alignItems="center" sx={{ boxShadow: 3 }}>
            <Box display='flex' justifyContent="space-between" width="100%" mb={1}>
              <CustomTypography fontSize="1.2rem" variant="caption">Ảnh sản phẩm</CustomTypography>
              <Button
                startIcon={<DeleteOutlined />}
                variant="outlined"
                color="error"
                onClick={handleDeleteFile}
                sx={{ borderRadius: '25px' }}
                disabled={files.length === 0}
              >
                <CustomTypography
                  variant="button"
                >
                  Delete
                </CustomTypography>
              </Button>
            </Box>
            {/* Placeholder for Image */}
            <CssVarsProvider>
              <AspectRatio
                ratio="1"
                sx={{
                  width: '100%',
                  borderRadius: '12px',
                  '& .drop_input': {
                    display: 'block',
                    width: '100%',
                    height: '0',
                    paddingTop: '100%',
                    backgroundImage: `url(${files.length > 0 ? URL.createObjectURL(files[showingFile]) : AddImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center', // Centers the background image
                    backgroundSize: files.length > 0 ? '100%' : '80%', // Adjusts the size to create padding effect
                  },
                  '& .drop_input input': {
                    display: 'block',
                    width: '100%',
                    height: 0,
                    borderRadius: '3px',
                    paddingTop: '100%',
                    mt: '-100%'
                  }
                }}
              >
                <FileUploader
                  classes={"drop_input"}
                  handleChange={handleChangeFile}
                  type={fileTypes}
                  fileOrFiles={showingFile && files.length > 0 ? files[showingFile] : files[0]}
                >
                  <></>
                </FileUploader>
              </AspectRatio>
            </CssVarsProvider>
            {/* Thumbnails */}
            <Box display="flex" gap={2} mt={1} maxWidth="100%" sx={{ overflowX: "auto", cursor: 'pointer', '&:hover': { filter: 'brightness(0.8) ' } }}>
              {
                files.map((file, index) => {
                  return (
                    <Box
                      key={index}
                      component="img"
                      alt="Product Image"
                      sx={{
                        width: '68px',
                        height: '68px',
                        objectFit: 'cover', // Makes sure the image covers the square box
                        borderRadius: 2,   // Optional: for rounded corners
                      }}
                      src={URL.createObjectURL(file)}
                      onClick={() => setShowingFile(index)}
                    />
                  )
                })
              }
            </Box>
          </Box>
          {/* Category Section */}
          <Box mt={1} p={3} borderRadius={2} display="flex" flexDirection="column" alignItems="center" sx={{ boxShadow: 3 }}>
            <Box display='flex' justifyContent="flex-start" width="100%">
              <CustomTypography fontSize="1.2rem" variant="caption">Phân loại sản phẩm</CustomTypography>
            </Box>
            <CssVarsProvider theme={joyTheme}>
              <Box width="100%" p={2}>
                <CustomTypography fontSize="1rem" variant="caption">Loại sản phẩm</CustomTypography>
                <Autocomplete
                  value={category}
                  onChange={(event, newValue) => setCategory(newValue)}
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
                  onChange={(e, newValue) => setBrand(newValue)}
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
                  onChange={(e, newValue) => setTag(newValue)}
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