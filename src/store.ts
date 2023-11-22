import { GridRowsProp } from '@mui/x-data-grid';
import { makeAutoObservable } from 'mobx';

class OrderStore {
  orderList: GridRowsProp = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default OrderStore;
