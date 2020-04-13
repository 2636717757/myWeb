import { fromJS } from 'immutable';
import { MIANBAOXIE } from './../constans';
const initialState = fromJS({
  mianbaoxie: '首页',
});
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MIANBAOXIE:
      return state.set('mianbaoxie', action.data);
    default:
      return state;
  }
};
