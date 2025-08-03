import { Card, CardActionArea, Grid, Typography } from '@mui/material';
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
        <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', mt: 5 }}>
            {topic && topic.map((topic, index) => {
                return (
                    <Grid item xs={7} key={index}>
                        <Card>
                            <CardActionArea onClick={() => { handleOnClick(topic.id) }}>
                                <Typography variant="h6" sx={{ padding: 2 }}>{topic.subtopic}</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}

        </Grid>
    );
}