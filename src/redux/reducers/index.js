import { combineReducers } from 'redux';
import authReducer from "../../containers/AdminTemplate/Login/modules/reducer"
import systemCinemaReducer from "../../components/Schedule/modules/reducer";
import { fetchFilmListReducer, addFilmReducer, deleteFilmReducer } from "../../containers/AdminTemplate/FilmManagement/modules/reducer"
const store = combineReducers({
    authReducer,
    fetchFilmListReducer,
    systemCinemaReducer,
    addFilmReducer,
    deleteFilmReducer
});

export default store;