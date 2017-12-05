import {
	INIT
} from '../actions/types';

const INTIAL_STATE = {
	initialData: null
};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
	case INIT:
		return { ...state, initialData: action.payload };
	default:
		return state;
	}
};
