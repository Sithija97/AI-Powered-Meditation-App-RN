
import Box from "@mui/material/Box";
import { FormControl, InputLabel, MenuItem, Select, ThemeProvider, Typography, createTheme, useTheme } from "@mui/material";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

const data3: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

export const HireAnalytics = () => {
  const theme = useTheme();
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
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
          <Typography flex={1} variant="h3">Vehicle Analytics</Typography>
          <Box flex={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Revenue Licence</MenuItem>
                <MenuItem value={20}>Insurance</MenuItem>
                <MenuItem value={30}>Smoke Test</MenuItem>
                <MenuItem value={30}>Port Permit</MenuItem>
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
                {/* <Tooltip title="View">
                          <Avatar
                            sx={{
                              color: "#00c853",
                              background: "#b9f6ca61",
                              margin: "0 15px 0 0",
                            }}
                          >
                            <VisibilityIcon />
                          </Avatar>
                        </Tooltip> */}

              </Box>
            )}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};
