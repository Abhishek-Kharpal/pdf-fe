import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Typography, InputBase, Paper, IconButton, Tooltip } from '@mui/material';
import Comment from '../../components/comment';
import { CommentI, FileI } from '../../types';
import SendIcon from '@mui/icons-material/Send';

const File = () => {
  const router = useRouter();
  const { key } = router.query;
  const [file, setFile] = useState<FileI>(null);
  const [comments, setComments] = useState<CommentI[]>(null);
  //TODO: Check for access to file

  useEffect(() => {
    // fetch comments and file from key
    setComments([
      {
        id: '123',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
      {
        id: '1',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
      {
        id: '2',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
      {
        id: '4',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
      {
        id: '5',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
      {
        id: '6',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
      {
        id: '7',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
      {
        id: '8',
        description: 'This is a comment',
        author: 'Abhishek',
        authorId: '123',
        createdAt: new Date(),
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>ShareIT | File</title>
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
              <Comment key={comment.id} description={comment.description} authorName="Abhishek" />
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
              <InputBase
                sx={{
                  width: '100%',
                  color: 'primary.contrastText',
                }}
                placeholder="Add Comment"
              />
              <Tooltip title="Send">
                <IconButton color="secondary">
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default File;
