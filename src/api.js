import axios from 'axios';

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    params: {
        // key: process.env.YOUTUBE_API_KEY,
        key: 'AIzaSyD40P0cW37ZrgsFCCvVhhsHEEHzgRBXR5c'
    }
});

export default request;