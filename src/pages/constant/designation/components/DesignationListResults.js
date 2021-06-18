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

const ListResults = ({ desginations }) => {
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
            <TableCell>Department</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {desginations &&
            desginations.length > 0 &&
            desginations.slice(0, limit).map((designation) => (
              <TableRow hover key={designation._id}>
                <TableCell>{designation.department.name}</TableCell>
                <TableCell>{designation.name}</TableCell>
                <TableCell>
                  <IconButton
                    style={{ float: "right", padding: 0 }}
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
      <TablePagination
        component="div"
        count={desginations?.length}
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
