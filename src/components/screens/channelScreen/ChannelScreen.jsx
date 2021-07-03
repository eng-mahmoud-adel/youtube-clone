import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideosByChannel } from '../../../redux/actions/videos';
import { Container, Row, Col } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Video from '../../../components/video/Video';
import './_channelScreen.scss';
import { getChannelDetails } from '../../../redux/actions/channel';
import numeral from 'numeral';

const ChannelScreen = () => {
    const {channelId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideosByChannel(channelId));
        dispatch(getChannelDetails(channelId));

    }, [dispatch, channelId]);

    const {videos, loading} = useSelector(state => state.channelVideos);
    const {snippet, statistics} = useSelector(state => state.channelDetails.channel);

    return (
        <>

            <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
                <div className="d-flex align-items-center">
                    <img src={snippet?.thumbnails?.default?.url} alt="" />

                    <div className="ml-3 channelHeader-details">
                        <h3>{snippet?.title}</h3>
                        <span>{numeral(statistics?.subscriberCount).format('0.a')}{' '}subscribers</span>
                    </div>
                </div>

                <button>Subscribe</button>
            </div>

            <Container>
                <Row className="mt-2">
                    {
                        !loading ? videos?.map(video => <Col md={3} lg={3}>
                            <Video video={video} ChannelScreen />
                        </Col>
                        )
                        :
                        [...Array(15)].map(() => 
                        <Col md={3} lg={3}>
                            <SkeletonTheme color="#343a40" highlightColor="#3c4147" subScreen>
                                <Skeleton width="100%" heigh="140px" />
                            </SkeletonTheme>
                        </Col>
                        )
                    }
                </Row>
            </Container>
        </>
    )
}

export default ChannelScreen;
