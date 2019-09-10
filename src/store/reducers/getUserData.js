import {getUser as getApi} from '../../apiServices';
import {StoreFetchableData} from './base';

class GetUserData extends StoreFetchableData {
  constructor() {
    super('getUser', getApi);
  }
  fetchCall(data) {
    const that = this;
    return dispatch =>
      this.fetchData(data)
        .then(res => dispatch(that.actions.response(res)))
        .catch(err => dispatch(that.actions.error(err)));
  }
}

export var getUser = new GetUserData();
