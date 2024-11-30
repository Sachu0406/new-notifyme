/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { store } from "./StoreIndex";
import {
  updateJobNotificationDetailByIdAPI,
  deleteJobNotificationDetailByIdAPI,
  getAllNotificationAPI,
  addNewNotificationAPI,
  getAllNotificationDetailByIdAPI,
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
    return await addNewNotificationAPI(dataObj);
  },
  updateNotificationDetailById: async (id: string, dataObj: GenericObject) => {
    return await updateJobNotificationDetailByIdAPI(id, dataObj);
  },
  deleteNotificationDetailById: async (id: string) => {
    return await deleteJobNotificationDetailByIdAPI(id);
  },
}));

export default useAllDataStore;
