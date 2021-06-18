import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const ListResults = ({ items }) => {
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
            <TableCell>Document</TableCell>
            <TableCell>Required Field</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items &&
            items.slice(0, limit).map((item, i) => (
              <TableRow hover key={i}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.isRequired}</TableCell>
                <TableCell align="right">
                  <IconButton
                    style={{ marginRight: 30, padding: 0 }}
                    onClick={() => {}}
                    color="primary"
                  >
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    style={{ padding: 0 }}
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
        count={items?.length}
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
  items: PropTypes.array.isRequired,
};

export default ListResults;
