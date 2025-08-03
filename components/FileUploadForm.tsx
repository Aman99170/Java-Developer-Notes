import { Button, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';

export default function FileUploadForm() {
  const [topic, setTopic] = useState<string>('');
  const [subtopic, setSubTopic] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleTopicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleSubTopicChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubTopic(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = useCallback(async(event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('topic', topic);
    formData.append('subtopic', subtopic);
    if (file !== null) {
       formData.append('file', file);
    }
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
     try {
    const response = await fetch(`${BASE_URL}/file/fileUpload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if(data.status==="success") {
      alert(data.filename+' file uploaded successfully');
      setTopic('');
      setSubTopic('');
      setFile(null);
    }
  } catch (error) {
    console.error(error);
  }
  },[topic,file]);

  return (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit} justifyContent="center"
    sx={{ textAlign: 'center', mt:30 }}>
      <Grid item xs={12}>
        <Typography variant="h6">Upload a File</Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          label="Topic"
          value={topic}
          onChange={handleTopicChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={7}>
        <TextField
          label="Sub Topic"
          value={subtopic}
          onChange={handleSubTopicChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span">
            {file ? file.name : 'Select a File'}
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </Grid>
    </Grid>
  );
}