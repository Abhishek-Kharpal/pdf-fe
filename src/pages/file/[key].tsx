import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, InputBase, Paper, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../../contexts/auth';
import { LoadingContext } from '../../contexts/loading';
import { ToastContext } from '../../contexts/toast';
import Comment from '../../components/comment';
import { CommentI, FileI } from '../../types';
import { API_URL } from '../../constants/server';

const File = () => {
  const router = useRouter();
  const { key } = router.query;
  const [file, setFile] = useState<FileI>(null);
  const [comments, setComments] = useState<CommentI[]>(null);
  const [description, setDescription] = useState<string>('');

  const { user } = useContext(AuthContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { setToast } = useContext(ToastContext);

  const handleMount = async () => {
    try {
      setLoading(true);
      if (key) {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/file/${key}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFile(res.data.file);
        setComments(res.data.file.comments || []);
      }
    } catch (err) {
      setToast({
        open: true,
        message: err.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMount();
  }, [key]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/comment`,
        {
          description,
          fileID: key,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setComments([...comments, res.data.comment]);
      setToast({
        open: true,
        message: 'Comment added successfully',
        severity: 'success',
      });
    } catch (err) {
      setToast({
        open: true,
        message: err.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <></>;
  }

  if (user.files.find((file) => file.id === key) === undefined) {
    router.push('/dashboard');
  }

  if (loading || !key) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>ShareIT | {file ? file.name : 'File'}</title>
        <meta name="description" content="Dashboard for your pdf files" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        bgcolor="primary.main"
        minHeight="100vh"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: '20vw',
            height: '100vh',
            bgcolor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid #F5F5F5',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10vh',
              borderBottom: '1px solid #F5F5F5',
            }}
          >
            <Typography variant="h4" color="primary.contrastText">
              ShareIT
            </Typography>
          </Box>

          {/* Comments */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '80vh',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            className="basic-padding"
          >
            <Typography variant="h6" color="primary.contrastText">
              Comments
            </Typography>

            {/* Comments */}
            {comments?.map((comment) => (
              <Comment key={comment.id} description={comment.description} authorName={file.author.name} />
            ))}
          </Box>

          {/* Add Comment */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10vh',
              borderTop: '1px solid #F5F5F5',
            }}
          >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '50%',
                marginLeft: '8px',
                bgcolor: 'primary.main',
                border: '1px solid #F5F5F5',
                borderRadius: '0px',
              }}
              className="basic-padding"
            >
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onSubmit={handleSubmitComment}
              >
                <InputBase
                  sx={{
                    width: '100%',
                    color: 'primary.contrastText',
                  }}
                  placeholder="Add Comment"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Tooltip title="Send">
                  <IconButton type="submit" color="secondary">
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </form>
            </Paper>
          </Box>
        </Box>

        {/* PDF Viewer */}
        <Box
          sx={{
            width: '80vw',
            height: '100vh',
            bgcolor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <iframe
            src={`data:application/pdf;base64,${Buffer.from(file.data.data).toString('base64')}`}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title={`${file?.name} PDF Viewer`}
          />
        </Box>
      </Box>
    </>
  );
};

export default File;
