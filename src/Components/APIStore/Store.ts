/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { store } from "./StoreIndex";
import {
  deleteAllNotificationDetailByIdAPI,
  getAllNotificationAPI,
  addNewNotificationAPI,
  getAllNotificationDetailByIdAPI,
  updateAllNotificationDetailByIdAPI,
} from "../APIServices/Services";
import { GenericObject } from "../Shared/ObjectModals";

const useAllDataStore = create<store>((set) => ({
  allNotificationList: [],
  notificationDetailsByIdList: [],

  getAllNotificationList: async () => {
    const res: any = await getAllNotificationAPI();
    set({
      allNotificationList: res,
    });
    return res;
  },
  getNotificationDetailsById: async (id: string) => {
    const res: any = await getAllNotificationDetailByIdAPI(id);
    set({
      notificationDetailsByIdList: res,
    });
    return res;
  },
  addNewNotification: async (dataObj: GenericObject) => {
    const res = await addNewNotificationAPI(dataObj);
    return res;
  },
  updateAllNotificationDetailByIdAPI: async (
    id: string,
    dataObj: GenericObject
  ) => {
    const res = await updateAllNotificationDetailByIdAPI(id, dataObj);
    return res;
  },
  deleteAllNotificationDetailByIdAPI: async (id: string) => {
    return await deleteAllNotificationDetailByIdAPI(id);
  },
}));

export default useAllDataStore;
