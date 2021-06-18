import { useState } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  IconButton,
  Paper,
} from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const BranchListResults = ({ branches }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper elevation={2} style={{borderRadius: 10}}>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches.slice(0, limit).map((branch) => (
                <TableRow hover key={branch.id}>
                  <TableCell>{branch.branchName}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      style={{ padding: 0, marginRight: 20 }}
                      onClick={() => {}}
                      color="primary"
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      style={{ float: "right", padding: 0 }}
                      onClick={() => {}}
                      color="secondary"
                    >
                      <DeleteForeverRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        component="div"
        count={branches.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

BranchListResults.propTypes = {
  branches: PropTypes.array.isRequired,
};

export default BranchListResults;
