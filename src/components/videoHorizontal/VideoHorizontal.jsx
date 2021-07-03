import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";

import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const VideoHorizontal = ({video, searchScreen, subScreen}) => {

  const {id, snippet: {channelId, channelTitle, description, title, publishedAt, resourceId, thumbnails: {medium}}} = video;

  const [duration, setDuration] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const [views, setViews] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const isVideo = !(id.kind === 'youtube#video' || subScreen);

  useEffect(() => {
    const get_video_details = async () => {
        const {data: {items}} = await request('/videos', {
            params: {
                part: 'contentDetails,statistics',
                id: id.videoId
            }
        });

        setDuration(items[0].contentDetails.duration);
        setViews(items[0].statistics.viewCount);

    }

    if(isVideo) {
      get_video_details();
    }
    

  }, [id, isVideo]);

  useEffect(() => {
    const get_channel_icon = async () => {
        const {data: {items}} = await request('/channels', {
            params: {
                part: 'snippet',
                id: channelId
            }
        });

        setChannelIcon(items[0].snippet.thumbnails.default);

    }

    get_channel_icon();

  }, [channelId]);


  const history = useHistory();

  const _channelId = resourceId?.channelId || channelId;
  
  const handleClick = () => {
    isVideo?
    history.push(`/watch/${id.videoId}`)
    :
    history.push(`/channel/${_channelId}`)
  }

  const thumbnail = !isVideo && 'videoHorizontal-thumbnail-channel';

  return (
    <Row className="videoHorizontal py-2 m-1 align-items-center" onClick={handleClick}>
      <Col xs={6} md={searchScreen || subScreen? 4 : 6} className="videoHorizontal-left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal-thumbnail ${thumbnail}`}
          wrapperClassName="videoHorizontal-thumbnail-wrapper"
        />

      {isVideo && <span className="videoHorizontal-duration">{_duration}</span>}
      </Col>

      <Col xs={6} md={searchScreen || subScreen? 8 : 6} className="videoHorizontal-right p-0">
        <p className="videoHorizontal-title">{title}</p>

        {isVideo && <div className="videoHorizontal-details">
            <AiFillEye /> {numeral(views).format("0.a")} views •
            {moment(publishedAt).fromNow()}
          </div> }

        {(searchScreen || subScreen) && <p className="mt-1 videoHorizontal-desc">{description}</p> }

        <div className="videoHorizontal-channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage
            src={channelIcon?.url}
            effect="blur"
          /> }

          <p className="mb-0">{channelTitle}</p>
        </div>

        {
          subScreen && <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        }
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
