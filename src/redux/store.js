import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/reducers";
import configReducer from "./config/reducers";
import dataReducer from "./contract-data/reducers";
import loginReducer from "./login/reducers";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  config: configReducer,
  data: dataReducer,
  login: loginReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
