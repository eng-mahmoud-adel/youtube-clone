import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCHED_VIDEO_FAIL, SEARCHED_VIDEO_REQUEST, SEARCHED_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIPTION_CHANNEL_FAIL, SUBSCRIPTION_CHANNEL_REQUEST, SUBSCRIPTION_CHANNEL_SUCCESS } from "../actionTypes";

const initialState= {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: 'All'
}

export const homeVideosReducer = (prevState = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case HOME_VIDEOS_REQUEST:
            return {
                ...prevState,
                loading: true,
            }

        case HOME_VIDEOS_SUCCESS:
            return {
                ...prevState,
                videos: prevState.activeCategory === payload.category? [...prevState.videos, ...payload.videos] : payload.videos,
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCategory: payload.category
            }

        case HOME_VIDEOS_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }      

        default:
            return prevState;
    }
}

export const selectedVideoReducer = (prevState = {loading: true, video: null}, action) => {
    const {type, payload} = action;

    switch (type) {
        case SELECTED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading: true
            }

        case SELECTED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading: false,
                video: payload
            }

        case SELECTED_VIDEO_FAIL:
            return {
                ...prevState,
                loading: false,
                video: null,
                error: payload
            }
    
        default:
            return prevState;
    }
}

export const relatedVideosReducer = (prevState = {loading: true, videos: []}, action) => {
    const {type, payload} = action;

    switch (type) {
        case RELATED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading: true
            }

        case RELATED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading: false,
                videos: payload
            }

        case RELATED_VIDEO_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
    
        default:
            return prevState;
    }
}

export const searchedVideosReducer = (prevState = {loading: true, videos: []}, action) => {
    const {type, payload} = action;

    switch (type) {
        case SEARCHED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading: true
            }

        case SEARCHED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading: false,
                videos: payload
            }

        case SEARCHED_VIDEO_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
    
        default:
            return prevState;
    }
}

export const subscriptionsChannelReducer = (prevState = {loading: true, videos: []}, action) => {
    const {type, payload} = action;

    switch (type) {
        case SUBSCRIPTION_CHANNEL_REQUEST:
            return {
                ...prevState,
                loading: true
            }

        case SUBSCRIPTION_CHANNEL_SUCCESS:
            return {
                ...prevState,
                loading: false,
                videos: payload
            }

        case SUBSCRIPTION_CHANNEL_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
    
        default:
            return prevState;
    }
}

export const channelVideosReducer = (prevState = {loading: true, videos: []}, action) => {
    const {type, payload} = action;

    switch (type) {
        case CHANNEL_VIDEOS_REQUEST:
            return {
                ...prevState,
                loading: true
            }

        case CHANNEL_VIDEOS_SUCCESS:
            return {
                ...prevState,
                loading: false,
                videos: payload
            }

        case CHANNEL_VIDEOS_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
    
        default:
            return prevState;
    }
}