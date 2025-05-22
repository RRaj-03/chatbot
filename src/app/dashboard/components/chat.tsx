import { Type, useSearchStore } from '@/store/useSearchStore'
import { Box, Typography, Stack, Card, CardMedia, Avatar } from '@mui/material'
import React from 'react'

const Chat = () => {
    const {searchHistory,openPreview} = useSearchStore()
  return (
    <Box sx={{width:'100%',height:"100%"}} >{searchHistory.map((entry, idx) => (
      <Box
      sx={{
        width:'fit-content',
        mr:entry.user===Type.USER?0:'auto',
        ml:entry.user===Type.USER?'auto':0,
        display:'flex',
        flexDirection:entry.user===Type.USER?'row-reverse':"row",
        alignItems:'end'
    }}
      >
        <Avatar sx={{mb:1}} alt="User" src={entry.user===Type.USER?"/user-avatar.jpg":"/chatbot.avif"}/>
        <Box key={idx}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
          m:1,
          bgcolor: 'background.paper',
        }}>
        <Typography variant="subtitle2" gutterBottom>
          {entry.prompt}
        </Typography>
        <Stack direction="row" spacing={1}>
          {entry.files.map((fileObj, fidx) => (
            <Card key={fidx} sx={{ width: 80, height: 80,p:1 }} onClick={()=>openPreview(fileObj.previewUrl)} >
              <CardMedia
                component="img"
                image={fileObj.previewUrl}
                alt={`Search ${idx} - File ${fidx}`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Card>
          ))}
        </Stack>
        </Box>
      </Box>
    ))}</Box>
  )
}

export default Chat