import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../../redux/actions/videos';
import CategoriesBar from '../../categoriesBar/CategoriesBar';
import Video from '../../video/Video';

import InfiniteScroll from 'react-infinite-scroll-component';
import VideoSkeleton from '../../skeletons/VideoSkeleton';

const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopularVideos());
    }, [dispatch]);

    const {videos, activeCategory, loading} = useSelector(state => state.homeVideos);

    const fetchData = () => {
        if(activeCategory === 'All') {
            dispatch(getPopularVideos());
        } else {
            dispatch(getVideosByCategory(activeCategory));
        }
    }

    return (
        <div>
            <Container>
                <CategoriesBar />

                <InfiniteScroll
                        dataLength={videos.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={true}
                        loader={<div className="spinner-border text-danger d-block mx-auto"></div>}
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                        }
                        style={{'overflow': 'none'}}
                    >
                    <Row>
                        {!loading ? videos.map((video) => (
                            <Col lg={3} md={4}>
                                <Video key={video.id} video={video} />
                            </Col>
                        ))
                           :
                           [...Array(20)].map(() => (
                                <Col lg={3} md={4}>
                                    <VideoSkeleton />
                                </Col>
                            ))
                        }
                    </Row>
                </InfiniteScroll>
            </Container>
        </div>
    )
}

export default HomeScreen;
