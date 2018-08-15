const initialState = {
};

/* TYPES */
const GET_HIGHSCORES = 'game/GET_HIGHSCORES';

/* ACTIONS */

/* SELECTORS */


/* REDUCER */
export const gameReducer = (state = initialState, action: {type: string}) => {
    switch (action.type) {
        case GET_HIGHSCORES:
            
        default:
            return state;
    }
};
