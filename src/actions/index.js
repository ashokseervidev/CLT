import {
	INIT
} from './types';
import { data } from '../mocks/data'

export const init = () => ({type: INIT, payload: data});
