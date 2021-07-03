import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribedChannels } from '../../../redux/actions/videos';
import VideoHorizontal from '../../videoHorizontal/VideoHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './_subscriptionsScreen.scss';

const SubscriptionsScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubscribedChannels());

    }, [dispatch]);

    const {videos, loading} = useSelector(state => state.subscriptionsChannel);

    return (
        <Container fluid>
            {!loading ? videos?.map((video) => <VideoHorizontal video={video} key={video.id} />) 
            :
            <SkeletonTheme color="#343a40" highlightColor="#3c4147" subScreen>
                <Skeleton width="100%" heigh="160px" count={20} />
            </SkeletonTheme>
            }
        </Container>
    )
}

export default SubscriptionsScreen;
