/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericObject } from "../Shared/ObjectModals";

export type store = {
  allNotificationList: Array<GenericObject>;
  allRestNotificationList: Array<GenericObject>;
  notificationDetailsByIdList: any;
  getAllNotificationList: () => any;
  getAllRestNotificationList: () => any;
  getNotificationDetailsById: (id: string) => any;
  addNewNotification: (dataObj: GenericObject) => any;
  addNewRestNotification: (dataObj: any) => any;
  updateAllNotificationDetailByIdAPI: (
    id: string,
    dataObj: GenericObject
  ) => any;
  deleteAllNotificationDetailByIdAPI: (id: string) => any;
};
