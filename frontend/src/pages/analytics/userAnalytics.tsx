
import Box from "@mui/material/Box";
import { Avatar, FormControl, InputLabel, MenuItem, Select, ThemeProvider, Tooltip, Typography, createTheme, useTheme } from "@mui/material";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import ImageIcon from '@mui/icons-material/Image';

type Person = {
  name: string; 
  startDate: string;
  endDate: string;
};

const data3: Person[] = [
  {
    name: 'John',
    startDate: '2023/05/20',
    endDate: '2025/05/20',
  },
  {
    name: 'John',
    startDate: '2023/05/20',
    endDate: '2025/05/20',
  },
  {
    name: 'John',
    startDate: '2023/05/20',
    endDate: '2025/05/20',
  },
  {
    name: 'John',
    startDate: '2023/05/20',
    endDate: '2025/05/20',
  },
];

export const UserAnalytics = () => {
  const theme = useTheme();
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'startDate', //normal accessorKey
        header: 'Start Date',
        size: 200,
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        size: 150,
      },
    ],
    [],
  );

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: theme.palette.secondary,
        },
      }),
    [theme]
  );
  return (
    <Box>
      <Box
        boxShadow={"0px 1px 18px 1px #BFD5EB"}
        padding={theme.spacing(5)}
      >
        <Box display={'flex'} alignItems={'center'} mb={3}>
          <Typography flex={1} variant="h3">User Analytics</Typography>
          <Box flex={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>NIC</MenuItem>
                <MenuItem value={20}>Police Report</MenuItem>
                <MenuItem value={30}>Driving Licence</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <ThemeProvider theme={tableTheme}>
          <MaterialReactTable
            columns={columns}
            data={data3}
            enableRowActions
            positionActionsColumn="last"
            muiTableHeadCellProps={{
              sx: () => ({
                borderTop: "1px solid #ddd",
                background: "#FBFBFB",
                fontFamily: "poppins",
                fontWeight: 500,
              }),
            }}
            muiTablePaperProps={{
              sx: () => ({
                boxShadow: "none",
              }),
            }}
            displayColumnDefOptions={{
              "mrt-row-actions": {
                size: 120, //make actions column wider
              },
            }}
            renderRowActions={({ row }) => (
              <Box sx={{ display: "flex" }}>
                <Tooltip title="View">
                  <Avatar
                    sx={{
                      color: "#00c853",
                      background: "#b9f6ca61",
                      margin: "0 15px 0 0",
                    }}
                  >
                    <ImageIcon />
                  </Avatar>
                </Tooltip>

              </Box>
            )}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};
