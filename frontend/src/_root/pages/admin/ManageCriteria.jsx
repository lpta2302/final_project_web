import { DataGrid, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { PageContainer } from '@toolpad/core';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { CustomGridToolbar, ManagePageSearch, SplitButton } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDeleteBrand, useDeleteCategory, useDeleteTag, useReadAllBrand, useReadAllCategory, useReadAllTag } from '../../../api/queries.js';


const criteria = {
  brand: {
    read: useReadAllBrand,
    delete: useDeleteBrand,
    columns: [
      { field: 'brandCode', headerName: 'Id', width: 150 },
      { field: 'brandName', headerName: 'Hãng sản xuất', width: 200, editable: true}
    ],
    require: ['brandName']
  },
  category: {
    read: useReadAllCategory,
    delete: useDeleteCategory,
    columns: [
      { field: 'categoryCode', headerName: 'Id', width: 150},
      { field: 'categoryName', headerName: 'Loại sản phẩm', width: 200, editable: true,}
    ],
    require: ['categoryName']
  },
  tag: {
    read: useReadAllTag,
    delete: useDeleteTag,
    columns: [
      { field: 'tagCode', headerName: 'Id', width: 150 },
      { field: 'tagName', headerName: 'Tên thẻ', width: 200, editable: true}
    ],
    require: ['tagName']
  },
  // specification:{
  //   read: useReadAllSpecification,
  //   delete: useDeleteSpecification,
  //   columns: [
  //     { field: 'specCode', headerName: 'Id', width: 150 },
  //   { field: 'specName', headerName: 'Loại ', width: 200 }
  //   ]
  // }
}

const criteriaKeys = Object.keys(criteria);

function ManageCriteria() {
  const [criterion, setCriterion] = useState('category')
  const [searchValue, setSearchValue] = useState('')
  const [rows, setRows] = useState()
  const [rowModesModel, setRowModesModel] = useState({})

  const currentCriterion = criteria[criterion]

  const { data } = currentCriterion.read();
  const [dialogPayload, setDialogPayload] = useState({ state: false, id: null });
  const { mutateAsync: handleDelete } = currentCriterion.delete();
  // const { mutateAsync: updateAccountStatus } = useUpdateAccountStatus();
  


  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-criteria', title: 'Quản lý tiêu chí phân loại' },
  ]

  useEffect(() => setRows(data), [data,criterion])
  

  const columns = [
    ...currentCriterion.columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      align: 'center',
      cellClassName: 'actions',
      getActions: ({ row: { _id: id } }) => {
        return [
          <GridActionsCellItem
            icon={<Delete color='error' />}
            label="Delete"
            onClick={() => setDialogPayload({ state: true, id: id })}
            color="inherit"
            key="delete"
          />
        ];
      }
    }
  ];

  const handleDeleteClick = async (isAccept) => {

    const { id } = dialogPayload

    if (!isAccept) {
      setDialogPayload({ state: false, id: null });
      return;
    }


    await handleDelete(id)
    setRows(rows.filter((row) => row.accountCode !== id));
    setDialogPayload({ state: false, id: null });
  }

  const handleUpdate = async (newRow) => {
    console.log(newRow);

    const validation = currentCriterion.require.every(col => newRow[col] && newRow[col].trim()!=='');
    console.log("🚀 ~ handleUpdate ~ validation:", validation)
    
    if (!validation) {
      if (newRow.isNew) {
        setRows(rows.filter(row=>row.id !== newRow.id))
        return;
      } else{
        toaster('Name is required for new entries!', { variant: 'error' });
        throw new Error('Name is required');
      }
    }
    
    // await updateAccountStatus(updatedRow)
    toaster("Cập nhật trạng thái tài khoản thành công", { variant: 'success' })
    const updatedRow = { ...newRow, isNew: false };
    return updatedRow;
  }

  const handleUpdateError = (error) => {
    console.error(error);
  }

  const handleSearch = () => {
    console.log(searchValue);
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  


  return (
    <PageContainer
      title='Quản lý tiêu chí phân loại'
      breadCrumbs={breadcrumbs}
      sx={{ maxWidth: { xl: 'unset', lg: '94vw', sm: '92vw', xs: '100vw' } }}
    >
      <Box
        display='flex'
        width='100%'
        justifyContent='space-between'
      >
        <Box
          maxHeight='50%'
        >
          <SplitButton
            options={criteriaKeys}
            selecting={criterion}
            setSelecting={setCriterion}
          />
        </Box>
        <ManagePageSearch
          {...{ searchValue, setSearchValue, handleSearch }}
        />
      </Box>
      <DataGridConfirmDialog
        onClick={handleDeleteClick}
        state={dialogPayload.state}
        title="Xác nhận xóa?"
        content="Sản phẩm, bao gồm cả thông tin sẽ bị xóa vĩnh viễn và không thể khôi phục."
      />
      <DataGrid
        getRowId={(row) => row[criterion+'Code']? row[criterion+'Code'] : row.id}
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        slots={{ toolbar: CustomGridToolbar }}
        slotProps={{toolbar: {setRows, setRowModesModel, columnFields: columns.map(column=>column.field)}}}
        processRowUpdate={handleUpdate}
        onCellEditStop={(...arg)=>{console.log(arg)}}
        onProcessRowUpdateError={handleUpdateError}
        onRowModesModelChange={handleRowModesModelChange}
      />

    </PageContainer>
  )
}

export default ManageCriteria