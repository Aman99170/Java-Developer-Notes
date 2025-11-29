import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ITopic } from '../Interface/topics';
import Subtopic from './Subtopic';

export default function Notes() {

    const [topics, setTopic] = useState<ITopic[]>();
    const [selectedTopic, setSelectedTopic] = useState<string | null>();

    const handleClick = (topic: string) => {
        if (selectedTopic && selectedTopic === topic) {
            setSelectedTopic(null); 
        } else {
            setSelectedTopic(topic);
        }
    };

    const fetchAllTopics = useCallback(async () => {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${BASE_URL}/file/getAllTopics`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                setTopic(await response.json());
            } else {
                console.error("Failed to fetch topics");
            }
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    }, [topics])

    useEffect(() => {
        fetchAllTopics();
    }, [ ])

    return (
        <Grid container spacing={3} justifyContent="center">
      {topics && topics.map((topic, index) => (
        <Grid item xs={12} sm={8} md={6} key={index}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              },
            }}
          >
            <CardActionArea onClick={() => handleClick(topic.topic)}>
              <Box sx={{ py: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 , textAlign: 'center' }}>
                  {topic.topic}
                </Typography>
              </Box>
            </CardActionArea>

            {selectedTopic === topic.topic && (
              <Box sx={{ px: 2, pb: 2 }}>
                <Subtopic topic={topic.subtopic} />
              </Box>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
    );
}