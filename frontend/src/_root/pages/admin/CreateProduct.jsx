import { FormGroup } from "@mui/material"
import { PageContainer } from "@toolpad/core"
import PageToolbar from "../../../components/pageContainer/PageToolbar"

function CreateProduct() {
  return (
    <PageContainer
      title='Thêm sản phẩm mới'
      sx={{ maxWidth: { xl: 'unset', lg: '94vw', sm: '92vw', xs: '100vw' } }}
      slots={{toolbar: PageToolbar}}
    >

    </PageContainer>
  )
}

export default CreateProduct