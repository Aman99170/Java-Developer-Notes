import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { ISubtopic } from '../Interface/topics';
import { useCallback } from 'react';

export default function Subtopic({ topic }: { topic: ISubtopic[] }) {
    const handleOnClick = useCallback(async (id: number) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/${id}`, {
            method: "GET"
        });
        if (res.ok) {
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            let filename = '';
            const contentDisposition = res.headers.get('content-disposition');
            if (contentDisposition && contentDisposition.includes('filename=')) {
                const match = contentDisposition.split('filename=')[1];
                if (match) {
                    filename = match.replace(/["']/g, '').trim();
                }
            }
            a.download = filename; // Use the extracted filename or fallback
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            alert("File downloaded successfully");
        } else {
            alert("Failed to download file");
        }
    }, []);
    return (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      {topic && topic.map((item, index) => (
        <Grid item xs={12} sm={8} md={6} key={index}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "0.25s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 5px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardActionArea onClick={() => handleOnClick(item.id)}>
              <Box sx={{ py: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 500, textAlign: 'center' }}>
                  {item.subtopic}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    );
}