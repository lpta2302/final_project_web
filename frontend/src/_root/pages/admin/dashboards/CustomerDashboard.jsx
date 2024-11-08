import { Box, Card, CardContent, Typography, Grid2, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import { CustomPageContainer, HighLightCard } from '../../../../components';

// Sample data (replace these with your actual data-fetching logic)
const customerInsightsData = {
  totalCustomers: 1200,
  activeCustomers: 1000,
  inactiveCustomers: 200,
  ageDemographics: {
    '18-24': 300,
    '25-34': 500,
    '35-44': 250,
    '45+': 150,
  },
  topLocations: [
    { city: 'New York', count: 150 },
    { city: 'Los Angeles', count: 120 },
    { city: 'Chicago', count: 90 },
  ],
};

const breadcrumbs = [
  { path: '/', title: 'Home' },
  { path: '/reports', title: 'Báo cáo' },
  { path: '/reports/accounts', title: 'Khách hàng' }
]

const CustomerDashboard = () => {

  return (
    <CustomPageContainer
      breadCrumbs={breadcrumbs}
      title='Báo cáo khác hàng'
      // slots={{ toolbar: PageToolbar }}
      // slotProps={{
      //   toolbar: {
      //     handleSaveDraft: !initProductId && (async () => handleSave(true)), handleSave: async () => handleSave(),
      //     handleDelete: initProductId ? async () => { await deleteProduct(initProductId); navigate(-1); } : ()=>navigate(-1),
      //     disabled: !validateForm()
      //   }
      // }}
    >
      <Grid2 container spacing={2}>
        <Grid2 container size={12} >
          <Grid2 size={{md: '4', xs: '12'}}>
            <HighLightCard/>
          </Grid2>
        </Grid2>
      </Grid2>
    </CustomPageContainer>
  );
};

export default CustomerDashboard;
