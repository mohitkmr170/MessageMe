import thunkMiddleware from 'redux-thunk';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {mapValues} from 'lodash';
import logger from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import * as reducers from './reducers';

const appReducers = {
  ...mapValues(reducers, 'reducers'),
  form: formReducer,
};

const appReducer = combineReducers(appReducers);

const rootReducer = (state, action) => {
  if (action.type === 'RESPONSE_logoutUser') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`);
    });

    // state = undefined;
    // state.getBanners = banners;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], // Names of reducers which will be persisted.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware, logger),
);
export const persistor = persistStore(store);
