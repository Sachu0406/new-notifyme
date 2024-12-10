import { serviceConstant } from "./AllApis";
import { httpPromise } from "./httpPromise";
import { httpPromise2 } from "./httpPromise2";

// new notification at one place
export const addNewNotificationAPI = async (dataObj: any) => {
  return httpPromise.post(
    `${serviceConstant.AllNotificationAPI}/createNotification`,
    dataObj
  );
};

export const getAllNotificationAPI = async () => {
  return httpPromise.get(
    `${serviceConstant.AllNotificationAPI}/getAllNotification`
  );
};
export const getAllNotificationByStateAPI = async (stateId: string) => {
  return httpPromise.get(
    `${serviceConstant.AllNotificationAPI}/getAllNotificationByStateId/${stateId}`
  );
};
export const getAllNotificationDetailByIdAPI = async (id: string) => {
  return httpPromise.get(
    `${serviceConstant.AllNotificationAPI}/getNotificationDetailsById/${id}`
  );
};
export const updateAllNotificationDetailByIdAPI = async (
  id: string,
  dataObj: any
) => {
  return httpPromise.put(
    `${serviceConstant.AllNotificationAPI}/updateNotificationById/${id}`,
    dataObj
  );
};
export const deleteAllNotificationDetailByIdAPI = async (id: string) => {
  return httpPromise.delete(
    `${serviceConstant.AllNotificationAPI}/deleteNotificationById/${id}`
  );
};

// spreadSheet urls

export const addNewNotificationRestAPI = async (dataObj: any) => {
  return httpPromise2.post(``, dataObj);
};

export const getAllNotificationRestAPI = async () => {
  return httpPromise2.get(``);
};
