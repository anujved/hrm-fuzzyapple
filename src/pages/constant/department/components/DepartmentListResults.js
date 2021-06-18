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
} from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const ListResults = ({ departments }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments &&
              departments.length > 0 &&
              departments.slice(0, limit).map((department) => (
                <TableRow hover key={department._id}>
                  <TableCell>{department.branch.branchName}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => {}} color="primary" style={{padding: 0, marginRight: 20}}>
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => {}} color="secondary" style={{padding: 0}}>
                      <DeleteForeverRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      <TablePagination
        component="div"
        count={departments?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ListResults.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default ListResults;
