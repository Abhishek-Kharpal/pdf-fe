import { Box, Typography, Divider } from '@mui/material';
import { FilesI } from '../../types';

const Card = ({ file }: { file: FilesI }) => {
  return (
    <Box
      sx={{
        width: '128px',
        height: '128px',
        border: '1px dashed #F5F5F5',
        marginTop: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        margin: '8px 8px 8px 0px',
        padding: '8px',
        '&:hover': {
          border: '1px solid #b785f5',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* TODO: Add pdf image */}
        <Typography variant="caption" color="primary.contrastText">
          {file.name}
        </Typography>

        <Typography variant="caption" color="primary.contrastText">
          {file.size} MB
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
