import { GenericObject } from "../Shared/ObjectModals";

export type store = {
  allNotificationList: Array<GenericObject>;
  notificationDetailsByIdList: GenericObject;
  getAllNotificationList: () => GenericObject;
  getNotificationDetailsById: (id: string) => GenericObject;
  addNewNotification: (dataObj: GenericObject) => GenericObject;
  updateNotificationDetailById: (
    id: string,
    dataObj: GenericObject
  ) => GenericObject;
  deleteNotificationDetailById: (id: string) => GenericObject;
};
