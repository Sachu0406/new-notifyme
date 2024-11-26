import { serviceConstant } from "./AllApis";
import { httpPromise } from "./httpPromise";

// new notification at one place
export const addNewNotificationAPI = async (dataObj: any) => {
  return httpPromise.post(
    `${serviceConstant.AllNotificationAPI}/createNotification`,
    dataObj
  );
};

export const getAllNotificationAPI = async () => {
  return httpPromise.get(`${serviceConstant.AllNotificationAPI}/getAllNotification`);
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







// stashed ones
export const getAllStatesAPI = async () => {
  return httpPromise.get(`${serviceConstant.stateApi}/getAllStates`);
};

export const RegisterUserAPI = async (dataObj: any) => {
  return httpPromise.post(`${serviceConstant.RegisterUser}`, dataObj);
};

export const AuthenticateUserAPI = async (dataObj: any) => {
  return httpPromise.post(`${serviceConstant.LoginUser}`, dataObj);
};

export const getVisitorsCountAPI = async () => {
  return httpPromise.get(`${serviceConstant.visitorsCount}`);
};

export const addNewJobNotificationAPI = async (dataObj: any) => {
  return httpPromise.post(
    `${serviceConstant.JobNotificationAPI}/createJob`,
    dataObj
  );
};

export const getAllJobNotificationAPI = async () => {
  return httpPromise.get(`${serviceConstant.JobNotificationAPI}/getAllJobs`);
};
export const getAllJobNotificationByStateAPI = async (stateId: string) => {
  return httpPromise.get(
    `${serviceConstant.JobNotificationAPI}/getAllJobsByStateId/${stateId}`
  );
};
export const getJobNotificationDetailByIdAPI = async (id: string) => {
  return httpPromise.get(
    `${serviceConstant.JobNotificationAPI}/getJobDetailsById/${id}`
  );
};
export const updateJobNotificationDetailByIdAPI = async (
  id: string,
  dataObj: any
) => {
  return httpPromise.put(
    `${serviceConstant.JobNotificationAPI}/updateJobById/${id}`,
    dataObj
  );
};
export const deleteJobNotificationDetailByIdAPI = async (id: string) => {
  return httpPromise.delete(
    `${serviceConstant.JobNotificationAPI}/deleteJobById/${id}`
  );
};
export const getAllAdmsNotificationAPI = async () => {
  return httpPromise.get(`${serviceConstant.AdmNotificationAPI}/getAllAdms`);
};

export const getAdmsNotificationDetailByIdAPI = async (id: string) => {
  return httpPromise.get(
    `${serviceConstant.AdmNotificationAPI}/getAdmsDetailsById/${id}`
  );
};

export const getAllAdmsNotificationByStateAPI = async (stateId: string) => {
  return httpPromise.get(
    `${serviceConstant.AdmNotificationAPI}/getAllAdmsByStateId/${stateId}`
  );
};

export const addNewAdmsNotificationAPI = async (dataObj: any) => {
  return httpPromise.post(
    `${serviceConstant.AdmNotificationAPI}/createAdm`,
    dataObj
  );
};

export const updateAdmsNotificationDetailByIdAPI = async (
  id: string,
  dataObj: any
) => {
  return httpPromise.put(
    `${serviceConstant.AdmNotificationAPI}/updateAdmById/${id}`,
    dataObj
  );
};

export const deleteAdmsNotificationDetailByIdAPI = async (id: string) => {
  return httpPromise.delete(
    `${serviceConstant.AdmNotificationAPI}/deleteAdmById/${id}`
  );
};
