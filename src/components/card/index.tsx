import { Box, Typography, Divider } from '@mui/material';
import { FileI } from '../../types';

const Card = ({ file }: { file: FileI }) => {
  return (
    <Box
      sx={{
        width: '180px',
        height: '180px',
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
        <Typography
          variant="caption"
          color="primary.contrastText"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {file.name}
        </Typography>

        <Typography variant="caption" color="primary.contrastText">
          {Math.round((file.size / 1024 / 1024) * 100) / 100} MB
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
