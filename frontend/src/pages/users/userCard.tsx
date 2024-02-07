// material-ui
import { Avatar, Box, Button, Grid, Typography, useTheme} from '@mui/material';
import shadows from '@mui/material/styles/shadows';


// ==============================|| SAMPLE PAGE ||============================== //

const UserCard = () => {
    const theme = useTheme();

    return (
        <Box p={theme.spacing(5)} boxShadow={'0px 1px 18px 1px #BFD5EB'}>
            <Box display={'flex'} alignItems={'center'}>
                <Avatar
                    alt="Remy Sharp"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    sx={{ width: 90, height: 90, marginRight: 3 }}
                />
                <Box>
                    <Typography variant='h3'>Mr. Kamal</Typography>
                    <Typography fontSize={'15px'}> Driver</Typography>
                </Box>
            </Box>
            <Grid container rowSpacing={3} columnSpacing={3} mt={theme.spacing(2)}>
                <Grid item xs={12}>
                    <Typography color={'#757575'} fontSize={'15px'}> Address</Typography>
                    <Typography fontSize='h3'> No 12, First lane, Colombo 03</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography color={'#757575'} fontSize={'15px'}> Mobile</Typography>
                    <Typography fontSize='h3'> 0773542366</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography color={'#757575'} fontSize={'15px'}> NIC NO</Typography>
                    <Typography fontSize='h3'> 883456234V</Typography>
                </Grid>
            </Grid>

            <Box display={'flex'} alignItems={'center'} mt={theme.spacing(3)}>
            <Button variant="contained" sx={{borderRadius:'10px', flexGrow:1, marginRight:'20px'}}>
              View User
            </Button>
            <Button variant="outlined" sx={{borderRadius:'10px' , flexGrow:1}}>
              Edit User
            </Button>
            </Box>
        </Box>
    )

};

export default UserCard;
