import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import PropTypes from 'prop-types';

const SearchToolBar = (props) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder={props.placeholderText}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

SearchToolBar.propTypes = {
    placeholderText: PropTypes.string,
}

export default SearchToolBar;
