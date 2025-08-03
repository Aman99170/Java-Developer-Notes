import { Card, CardActionArea, Grid, Typography } from '@mui/material';
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
    }, [])

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', mt: 30 }}>
            {topics && topics.map((topic, index) => {
                return (
                    <Grid item xs={7} key={index}>
                        <Card>
                            <CardActionArea onClick={() => { handleClick(topic.topic) }}>
                                <Typography variant="h6" sx={{ padding: 2 }}>{topic.topic}</Typography>
                            </CardActionArea>
                            {selectedTopic && selectedTopic === topic.topic && (
                                <Subtopic topic={topic.subtopic} />
                            )}
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}