import { Box, Typography } from '@mui/material';

interface Props {
  description: string;
  authorName: string;
}

const Comment = ({ description, authorName }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        padding: '8px',
        marginTop: '16px',
        border: '1px solid #F5F5F5',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="body1"
        color="primary.contrastText"
        sx={{
          marginBottom: '8px',
        }}
      >
        {description}
      </Typography>

      <Typography variant="body2" color="primary.contrastText">
        {authorName}
      </Typography>
    </Box>
  );
};

export default Comment;
