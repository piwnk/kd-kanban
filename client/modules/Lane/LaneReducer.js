import {
  CREATE_LANE,
  CREATE_LANES,
  UPDATE_LANE,
  DELETE_LANE,
  EDIT_LANE,
} from './LaneActions';
import {
  CREATE_NOTE,
  DELETE_NOTE,
} from '../Note/NoteActions';

import omit from 'lodash/omit';

const initialState = {};

const LaneReducer = (state = initialState, action) => {
  let lane;
  switch (action.type) {

    case CREATE_LANE:
      // return { ...state,
      //   [action.lane.id]: action.lane,
      // };
    case UPDATE_LANE:
      lane = {
        ...state[action.lane.id],
        ...action.lane,
      };
      return {
        ...state,
        [action.lane.id]: lane,
      };

    case EDIT_LANE:
      {
        lane = {
          ...state[action.laneId],
          editing: true,
        };
        return {
          ...state,
          [action.laneId]: lane,
        };
      }

    case CREATE_LANES:
      return { ...action.lanes,
      };
    case DELETE_NOTE:
      {
        const newLane = { ...state[action.laneId],
        };
        newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);

        return { ...state,
          [action.laneId]: newLane,
        };
      }
    case CREATE_NOTE:
      {
        const newLane = { ...state[action.laneId],
        };
        newLane.notes = newLane.notes.concat(action.note.id);

        return { ...state,
          [action.laneId]: newLane,
        };
      }
    case DELETE_LANE:
      {
        return omit(state, action.laneId);
      }


    default:
      return state;
  }
};

export default LaneReducer;
