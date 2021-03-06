// import uuid from 'uuid'
import { normalize } from 'normalizr';

import callApi from '../../util/apiCaller';

import { lanes } from '../../util/schema'; // WHY not lanesSchema?

export const CREATE_LANES = 'CREATE_LANES';
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';

import { createNotes } from '../Note/NoteActions';

export const createLanes = lanesData => ({
  type: CREATE_LANES,
  lanes: lanesData,
});

export const createLane = lane => ({
  type: CREATE_LANE,
  lane });

export const createLaneRequest = lane => {
  return dispatch => {
    return callApi('lanes', 'post', lane)
      .then(res => dispatch(createLane(res))
    );
  };
};

export const updateLane = lane => ({
  type: UPDATE_LANE,
  lane });

export const updateLaneNameRequest = lane => {
  return dispatch => (
    callApi(`lanes/${lane.id}`, 'put', { name: lane.name })
    .then(() => dispatch(updateLane(lane)))
  );
};

export const deleteLane = laneId => ({
  type: DELETE_LANE,
  laneId });

export const deleteLaneRequest = laneId => {
  return dispatch => {
    return callApi(`lanes/${laneId}`, 'delete')
      .then(dispatch(deleteLane(laneId)))
      .catch(err => console.log(err));
  };
};

export const editLane = laneId => {
  return {
    type: EDIT_LANE,
    laneId,
  };
};

// export const editLaneRequest = laneId => {
//   return dispatch => {
//     return callApi('lanes', 'put', laneId)
//       .then(() => dispatch(editLane(laneId))
//     );
//   };
// };


export const moveBetweenLanes = (targetLaneId, noteId, sourceLaneId) => ({
  type: MOVE_BETWEEN_LANES,
  targetLaneId,
  noteId,
  sourceLaneId,
});

export const moveBetweenLanesRequest = (targetLaneId, noteId, sourceLaneId) => dispatch => (
  callApi('notes/move', 'put', { targetLaneId, noteId, sourceLaneId })
  .then(dispatch(moveBetweenLanes(targetLaneId, noteId, sourceLaneId))
  )
);

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;

      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    })
      .catch(err => console.log(err));
  };
}
