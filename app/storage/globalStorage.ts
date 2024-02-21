import store, {RootState} from '../store';

export const getGlobalState = (): RootState => {
  return store.getState();
};

export const setGlobalState = (type: string, payload: any) => {
  store.dispatch({type: type, payload: payload});
};
