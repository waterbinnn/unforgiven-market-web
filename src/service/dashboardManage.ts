/**
 * @name dashboardManage
 * @description 상품 관리 api set 입니다.
 */

import { SellerListData } from '@/types/sellerTypes';
import { AxiosPromise } from 'axios';
import { axiosAuth } from './axiosServer';

interface DashboardManage {
  /**
   * @description 전체 상품 리스트 조회
   * @name dashboardManage.getList
   * @method {GET}
   * @param {page} string
   * @return {AxiosPromise<SellerListData>}
   **/
  readonly getList: (page?: string) => AxiosPromise<SellerListData>;
}

const dashboardManage: DashboardManage = {
  getList: (page?: string) => {
    return axiosAuth.get(`seller/`);
  },
};

export { dashboardManage };
