import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { Box, Typography, IconButton, Dialog, Paper, InputBase, Button, Tooltip, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../contexts/auth';
import { ToastContext } from '../../contexts/toast';
import { LoadingContext } from '../../contexts/loading';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { FileI } from '../../types';
import { API_URL } from '../../constants/server';
import { Label } from '@mui/icons-material';

const Card = ({ file }: { file: FileI }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const { setLoading } = useContext(LoadingContext);

  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [shareEmail, setShareEmail] = useState('');

  const mobile = useMediaQuery('(max-width: 425px)');

  const handleShare = (e) => {
    e.stopPropagation();
    setOpenShareDialog(true);
  };

  const handleDialogClose = (e) => {
    e.stopPropagation();
    setOpenShareDialog(false);
  };

  const handleFileShare = async (e) => {
    e.stopPropagation();
    const isValidEmail = shareEmail.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!isValidEmail) {
      setToast({ open: true, message: 'Please enter a valid email', severity: 'error', duration: 3000 });
      setOpenShareDialog(false);
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `${API_URL}/file/share/${file.id}`,
        {
          email: shareEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 201) {
        setToast({ open: true, message: 'File shared successfully', severity: 'success', duration: 3000 });
      } else {
        setToast({ open: true, message: 'Something went wrong', severity: 'error', duration: 3000 });
      }
    } catch (err) {
    } finally {
      setOpenShareDialog(false);
      setLoading(false);
      setShareEmail('');
    }
  };

  if (!file) {
    return <></>;
  }

  if (!user) {
    return <></>;
  }
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
        id: `card-${file.id}`,
      }}
      onClick={() => router.push(`/file/${file.id}`)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" color="primary.contrastText">
            {Math.round((file.size / 1024 / 1024) * 100) / 100} MB
          </Typography>
          {file.authorId === user.id && (
            <Tooltip title="Share" placement="top">
              <IconButton size="small" color="secondary" sx={{ padding: '0px' }} onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        {openShareDialog && (
          <Dialog
            open={openShareDialog}
            onClose={handleDialogClose}
            aria-labelledby="share-dialog"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: mobile ? '240px' : '320px',
              }}
              className="basic-padding"
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <Typography variant="caption" color="primary.main">
                  Share
                </Typography>

                <Tooltip title="Close" placement="top">
                  <IconButton size="small" color="secondary" sx={{ padding: '0px' }} onClick={handleDialogClose}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <Label sx={{ marginRight: '8px' }}></Label>
                <InputBase
                  fullWidth
                  placeholder="Email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
              </Box>

              <Button
                sx={{
                  marginTop: '8px',
                  width: '100%',
                }}
                variant="contained"
                fullWidth
                color="secondary"
                onClick={handleFileShare}
              >
                Share
              </Button>
            </Paper>
          </Dialog>
        )}
      </Box>
    </Box>
  );
};

export default Card;
