import React from "react";
import "./_watchScreen.scss";

import { Row, Col } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import VideoMetaData from "../../videoMetaData/VideoMetaData";
import VideoHorizontal from "../../videoHorizontal/VideoHorizontal";
import Comments from "../../comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRelatedVideos, getVideoById } from "../../../redux/actions/videos";

const WatchScreen = () => {

  const {id} = useParams();
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));

  }, [dispatch, id]);

  const {video, loading} = useSelector(state => state.selectedVideo);

  const {videos, loading: relatedVideosLoading} = useSelector(state => state.relatedVideos);

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen-player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {!loading ? <VideoMetaData video={video} videoId={id} /> : <h6>loading...</h6>}

        <Comments videoId={id} totalComments={video?.statistics?.commentCount} />
      </Col>

      <Col lg={4}>
        {!loading ? videos?.filter(video => video.snippet).map(video => (
          <VideoHorizontal video={video} key={video.id.videoId} />
        ))
        :
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" heigh="130px" count={15} />
        </SkeletonTheme>
        }
      </Col>
    </Row>
  );
};

export default WatchScreen;
