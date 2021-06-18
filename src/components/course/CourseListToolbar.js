import {Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon} from '@material-ui/core';
import {Search as SearchIcon} from 'react-feather';

const CourseListToolbar = props => {

    return (
        <Box {...props}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button>
                    Import
                </Button>
                <Button sx={{mx: 1}}>
                    Import
                </Button>
                <Button color="primary" variant="contained">
                    Add Course
                </Button>
            </Box>
        </Box>
    );
}