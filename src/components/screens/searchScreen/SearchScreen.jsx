import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideosBySearch } from '../../../redux/actions/videos';
import VideoHorizontal from '../../videoHorizontal/VideoHorizontal';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SearchScreen = () => {

    const {query} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideosBySearch(query));

    }, [dispatch, query]);

    const {videos, loading} = useSelector(state => state.searchedVideos);

    return (
        <Container>
            {!loading ? (
                videos?.map(video => <VideoHorizontal video={video} key={video.id.videoId} searchScreen />)
            )
            :
            <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                <Skeleton width="100%" heigh="160px" count={20} />
            </SkeletonTheme>
            }
        </Container>
    )
}

export default SearchScreen;
