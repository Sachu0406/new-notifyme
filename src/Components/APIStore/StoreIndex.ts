/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericObject } from "../Shared/ObjectModals";

export type store = {
  allNotificationList: Array<GenericObject>;
  notificationDetailsByIdList: any;
  getAllNotificationList: () => any;
  getNotificationDetailsById: (id: string) => any;
  addNewNotification: (dataObj: GenericObject) => any;
  updateAllNotificationDetailByIdAPI: (
    id: string,
    dataObj: GenericObject
  ) => GenericObject;
  deleteAllNotificationDetailByIdAPI: (id: string) => any;
};
