/* eslint-disable react/prop-types */
import { DataGrid, GridActionsCellItem, GridEditInputCell, GridRowModes } from '@mui/x-data-grid';
import { PageContainer } from '@toolpad/core';
import { useEffect, useState } from 'react';
import DataGridConfirmDialog from '../../../components/dialogs/DataGridConfirmDialog.jsx';
import { CustomEditCell, CustomGridToolbar, ManagePageSearch, SplitButton } from "../../../components";
import { enqueueSnackbar as toaster } from 'notistack';
import { Badge, Box, styled, Tooltip, tooltipClasses } from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { useCreateBrand, useCreateCategory, useCreateTag, useDeleteBrand, useDeleteCategory, useDeleteTag, useReadAllBrand, useReadAllCategory, useReadAllTagAdmin, useUpdateBrand, useUpdateCategory, useUpdateTag } from '../../../api/queries.js';

const StyledBox = styled('div')(({ theme }) => ({
  '& .Mui-error': {
    backgroundColor: "#ffcdd2",
    ...theme.applyStyles('dark', {
      color: "#000"
    })
  },
}));

const criteria = {
  brand: {
    create: useCreateBrand,
    read: useReadAllBrand,
    delete: useDeleteBrand,
    update: useUpdateBrand,
    columns: [
      { field: 'brandCode', headerName: 'Id', width: 150, editable: true, renderEditCell: (params) => (<CustomEditCell {...params} isRequired/>), isRequired: true },
      { field: 'brandName', headerName: 'Hãng sản xuất', width: 200, editable: true, renderEditCell: (params) => (<CustomEditCell {...params} isRequired/>), isRequired: true }
    ],
    savedFields: ['brandName', 'brandCode']
  },
  category: {
    create: useCreateCategory,
    read: useReadAllCategory,
    delete: useDeleteCategory,
    update: useUpdateCategory,
    columns: [
      { field: 'categoryCode', headerName: 'Id', width: 150, editable: true, renderEditCell: (params) => (<CustomEditCell {...params} />), isRequired: true },
      { field: 'categoryName', headerName: 'Loại sản phẩm', width: 200, editable: true, renderEditCell: (params) => (<CustomEditCell {...params} />), isRequired: true }
    ],
    savedFields: ['categoryName', 'categoryCode']
  },
  tag: {
    create: useCreateTag,
    read: useReadAllTagAdmin,
    delete: useDeleteTag,
    update: useUpdateTag,
    columns: [
      { field: 'tagCode', headerName: 'Id', width: 150, editable: true, renderEditCell: (params) => (<CustomEditCell {...params} />), isRequired: true },
      { field: 'tagName', headerName: 'Tên thẻ', width: 200, editable: true, renderEditCell: (params) => (<CustomEditCell {...params} />), isRequired: true }
    ],
    savedFields: ['tagName', 'tagCode']
  },
  // specification:{
  //   read: useReadAllSpecification,
  //   delete: useDeleteSpecification,
  //   columns: [
  //     { field: 'specCode', headerName: 'Id', width: 150, editable: true },
  //   { field: 'specName', headerName: 'Loại ', width: 200 }
  //   ]
  // }
}

const criteriaKeys = Object.keys(criteria);

function ManageCriteria() {
  const [criterion, setCriterion] = useState('category')
  const [searchValue, setSearchValue] = useState('')
  const [updateCellError, setUpdateCellError] = useState({})
  const [rows, setRows] = useState()
  const [rowModesModel, setRowModesModel] = useState({})
  const [rowChanges, setRowChanges] = useState(null)

  const currentCriterion = criteria[criterion]


  const { mutateAsync: createRecord } = currentCriterion.create();
  const { data } = currentCriterion.read();
  const { mutateAsync: updateCriterion, isError: updateFaild } = currentCriterion.update();
  const { mutateAsync: deleteRecord } = currentCriterion.delete();

  const [deleteDialogPayload, setDeleteDialogPayload] = useState({ state: false, id: null });
  const [updateDialogPayload, setUpdateDialogPayload] = useState({ state: false, id: null });


  const breadcrumbs = [
    { path: '/', title: 'Home' },
    { path: '/manage-criteria', title: 'Quản lý tiêu chí phân loại' },
  ]

  useEffect(() => setRows(data), [data, criterion])

  const handleEditCellProps = ({field, row, isRequired, props}) => {
    const {value} = props;
    setRowChanges(prev=>({...prev, [field]: value !== row[field]}));    

    if (isRequired) {
      const errorMessage = (!value || value.trim() === "") ? "Require" : ""
      setUpdateCellError(prev=>({...prev, [field]: errorMessage}))
      return { ...props, error: value !== row[field] && errorMessage };
    }
    return { ...props };
  }


  const columns = [
    ...currentCriterion.columns.map(column => (
      { ...column, preProcessEditCellProps: (params) => handleEditCellProps({ ...params, isRequired: column.isRequired, field: column.field }) })),
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      align: 'center',
      cellClassName: 'actions',
      getActions: ({ row }) => {
        const id = row._id ? row._id : row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={() => setUpdateDialogPayload({ state: true, id: id, row })}
              key="save"
              disabled={ 
                !rowChanges || !Object.values(rowChanges).some((changed) => changed) ||
                Object.values(updateCellError).some((error) => error)
              }
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="error"
              key="cancel"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            key="edit"
          />,
          <GridActionsCellItem
            icon={<Delete color='error' />}
            label="Delete"
            onClick={() => setDeleteDialogPayload({ state: true, id: id })}
            color="inherit"
            key="delete"
          />
        ];
      }
    }
  ];


  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    //new => delete from rows

    const editedRow = rows.find((row) => row.id === id || row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleDeleteClick = async (isAccept) => {
console.log("delete");

    const { id } = deleteDialogPayload

    if (!isAccept) {
      setDeleteDialogPayload({ state: false, id: null });
      return;
    }


    const isDeleted = await deleteRecord(id);
    setDeleteDialogPayload({ state: false, id: null });

    if(!isDeleted){
      toaster("Xóa thất bại", { variant: 'error' })
      throw new Error(isDeleted);
      
    }
    setRows(rows.filter((row) => row.accountCode !== id));
  }

  const handleUpdate = async (newRow, oldRow) => {
    let newData;

    if (newRow.isNew) {
      const data = {};
      for (const key in newRow) {
        if (currentCriterion.savedFields.some(field => field === key))
          data[key] = newRow[key];
      }

      newData = await createRecord(data);
      toaster("Tạo thành công.", { variant: 'success' })
    } else {
      const updatedData = await updateCriterion(newRow);
      
      if (!updatedData) {
        toaster("Cập nhật thất bại.", {variant: 'error'})
        return oldRow;
      }
      newData = { ...newRow, ...updatedData };
      toaster("Cập nhật thành công.", { variant: 'success' })
    }

    return newData

  }

  function confirmUpdate(isAccept) {
    if (isAccept) {
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [updateDialogPayload.id]: { mode: GridRowModes.View },
      }))
      setUpdateDialogPayload({ state: false, id: null });
      setRowChanges(null);
    } else
      setUpdateDialogPayload((prev) => ({ ...prev, state: false }));
  }

  const handleUpdateError = (error) => {
    console.error(error);
  }

  const handleSearch = () => {
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
        state={deleteDialogPayload.state}
        title="Xác nhận xóa?"
        content="Sản phẩm, bao gồm cả thông tin sẽ bị xóa vĩnh viễn và không thể khôi phục."
      />
      <DataGridConfirmDialog
        onClick={confirmUpdate}
        state={updateDialogPayload.state}
        title="Xác nhận cập nhật?"
        content="Sau khi cập nhật, thông tin sẽ được thay đổi trên toàn bộ hệ thống."
      />
      <StyledBox>
        <DataGrid
          paginationMode='server' 
          getRowId={(row) => row._id ? row._id : row.id}
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          slots={{ toolbar: CustomGridToolbar }}
          slotProps={{ toolbar: { setRows, setRowModesModel, columnFields: columns.map(column => column.field) } }}
          processRowUpdate={handleUpdate}
          onRowEditStop={handleRowEditStop}
          onProcessRowUpdateError={handleUpdateError}
          onRowModesModelChange={handleRowModesModelChange}
          pageSizeOptions={[10,25,100]}
          paginationModel={{pageSize: 10, page: 0}}
        />
      </StyledBox>

    </PageContainer>
  )
}

export default ManageCriteria