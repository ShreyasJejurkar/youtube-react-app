import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import { SearchBar, VideoList, VideoDetail } from "./components";

import Youtube from "./api/Youtube";

const App = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <Grid style={{ justifyContent: "center" }} container spacing={10}>
            <Grid item xs={11}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <SearchBar onSubmit={handleSubmit} />
                    </Grid>
                    <Grid item xs={8}>
                        <VideoDetail video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    async function handleSubmit(searchTerm) {
        const { data: { items: videos } } = await Youtube.get("search", {
            params: {
                part: "snippet",
                maxResults: 5,
                key: 'AIzaSyC3O1GlUWOjmrZYIk0RFzItX3Vdi-sVPpM',
                q: searchTerm,
            }
        });

        setVideos(videos);
        setSelectedVideo(videos[0]);
    }
}
export default App;