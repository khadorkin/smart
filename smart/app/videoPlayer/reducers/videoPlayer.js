import objectAssign from 'object-assign';

const initialState = {
  videoRoute: '',
  videoType: '',
  videoId: 0,
  percentageLoaded: 0,
  description: '',
  title: '',
  display: 'none',
  added: false,
  poster: '',
  selectedCarouselIndex: 0
};

export default function changeRef(state = initialState, action = {}) {
  /** The property 'type' of "action" cannot be changed. It is needed for redux.despatch method. */
  switch (action.type) {
    case 'videoRoute': {
      return objectAssign({}, state, {
        videoRoute: action.videoRoute,
        videoType: action.videoType,
        description: action.description,
        title: action.title,
        display: action.display,
        added: action.added,
        poster: action.poster,
        selectedCarouselIndex: action.selectedCarouselIndex
      });
    }
    case 'videoId': {
      return objectAssign({}, state, {
        videoId: action.videoId
      });
    }
    case 'percentageLoaded': {
      return objectAssign({}, state, {
        percentageLoaded: action.percentageLoaded
      });
    }
    default:
      return state;
  }
}
