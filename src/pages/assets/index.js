import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Header from "src/common/header";
import axios from "axios";
import SearchToolBar from "src/common/search-toolbar";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CreateAssetsModal from "./CreateAssetsModal";
import AssetsService from "src/webservices/assetsService";
import ConfirmDialog from "src/common/confirm-dialog";
import SimpleBackdrop from "src/common/backdrop";

const payslips = [
  {
    id: 1,
    name: "A1",
    purchaseDate: "May 1, 2020",
    supportUntil: "MAY 4, 2020",
    amount: "$100",
    description: "test",
  },
  {
    id: 2,
    name: "A1",
    purchaseDate: "May 1, 2020",
    supportUntil: "MAY 4, 2020",
    amount: "$100",
    description: "test",
  },
];

const Assets = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [assets, setAssets] = React.useState([]);
  const [asset, setAsset] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const getAssets = async () => {
    try {
      const response = await AssetsService.fetchAllAssets();
      setAssets(response);
    } catch (error) {}
  };

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const onSubmitClickListener = async (data) => {
    setOpenDialog(false);
    try {
      const response = await AssetsService.createAsset(data);
      getAssets();
    } catch (error) {}
  };

   /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
    const onDeleteClickListener = (meeting) => {
      setAsset(meeting);
      setOpenConfirmDialog(true);
    };
  
    const onConfirmClickListener = async () => {
      setOpenConfirmDialog(false);
      setOpenBackdrop(true);
      try {
        const result = await AssetsService.deleteAsset(asset._id);
        console.log("--Delete-Result--", result);
        setOpenBackdrop(false);
        getAssets();
      } catch (error) {
        console.log("--Delete-Error--", error);
        setOpenBackdrop(false);
      }
    };
  
    const onCancelClickListener = () => {
      setOpenConfirmDialog(false);
    };

    React.useEffect(() => {
      getAssets();
    }, []);

  return (
    <React.Fragment>
      <Helmet>Training List</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Assets"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <SearchToolBar placeholderText="Search" />
          <Card sx={{ mt: 3 }}>
            <PerfectScrollbar>
              <Box sx={{ pt: 3, minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Purchase Date</TableCell>
                      <TableCell>Support Until</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assets &&
                      assets.slice(0, limit).map((asset) => (
                        <TableRow hover>
                          <TableCell>{asset.name}</TableCell>
                          <TableCell>{asset.purchase_date}</TableCell>
                          <TableCell>{asset.support_until_date}</TableCell>
                          <TableCell>{asset.amount}</TableCell>
                          <TableCell>{asset.description}</TableCell>
                          <TableCell>
                            <Grid container>
                              <Grid>
                                <Tooltip title="Edit" placement="top" arrow>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={() => {}}
                                    color="primary"
                                  >
                                    <EditRoundedIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <Grid>
                                <Tooltip title="Delete" placement="top" arrow>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={() => onDeleteClickListener(asset)}
                                    color="secondary"
                                  >
                                    <DeleteForeverRoundedIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={assets.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateAssetsModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
      <SimpleBackdrop open={openBackdrop} />
    </React.Fragment>
  );
};

export default Assets;
