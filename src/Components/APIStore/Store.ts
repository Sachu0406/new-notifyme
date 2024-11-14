import { create } from "zustand";
import { store } from "./StoreIndex";
import {
  addNewJobNotificationAPI,
  getJobNotificationDetailByIdAPI,
  getAllJobNotificationAPI,
  getAllStatesAPI,
  updateJobNotificationDetailByIdAPI,
  getAllJobNotificationByStateAPI,
  getAllAdmsNotificationAPI,
  addNewAdmsNotificationAPI,
  updateAdmsNotificationDetailByIdAPI,
  getAllAdmsNotificationByStateAPI,
  getAdmsNotificationDetailByIdAPI,
  deleteAdmsNotificationDetailByIdAPI,
  deleteJobNotificationDetailByIdAPI,
  getVisitorsCountAPI,
  RegisterUserAPI,
  AuthenticateUserAPI,
} from "../APIServices/Services";

const useAllDataStore = create<store>((set, get) => ({
  stateList: [],
  allJobNotificationList: [],
  jobNotificationDetailsByIdList: [],
  jobNotificationDetailsStateIdList: [],
  allAdmsNotificationList: [],
  admsNotificationDetailsStateIdList: [],
  admsNotificationDetailsByIdList: [],
  visitorsCount: [],

  RegisterUser: async (dataObj: any) => {
    return await RegisterUserAPI(dataObj);
  },

  AuthenticateUser: async (dataObj: any) => {
    return await AuthenticateUserAPI(dataObj);
  },

  getVisitorsCount: async () => {
    const res: any = await getVisitorsCountAPI();
    set({ visitorsCount: res[0]?.count });
    return res.data;
  },
  getAllStates: async () => {
    const res: any = await getAllStatesAPI();
    const sortedStates = res.sort((a: any, b: any) => {
      return a.stateName.localeCompare(b.stateName);
    });
    set({ stateList: sortedStates });
    return res;
  },
  //Jobs sections
  getAllJobNotificationByState: async (stateId: string) => {
    const res: any = await getAllJobNotificationByStateAPI(stateId);
    set({ jobNotificationDetailsStateIdList: res });
    return res;
  },

  getAllJobNotificationList: async () => {
    let res: any = await getAllJobNotificationAPI();
    res = res.map((listItem: any) => ({
      ...listItem,
      active: listItem?.active ? "True" : "False",
      showBadge: listItem?.showBadge ? "True" : "False",
      applyStartDate: listItem?.applyStartDate
        ? new Date(listItem?.applyStartDate).toLocaleDateString("en-GB")
        : null,
      notificationDate: listItem?.notificationDate
        ? new Date(listItem?.notificationDate).toLocaleDateString("en-GB")
        : null,
      applyEndDate: listItem?.applyEndDate
        ? new Date(listItem?.applyEndDate).toLocaleDateString("en-GB")
        : null,
      examEndDate: listItem?.examEndDate
        ? new Date(listItem?.examEndDate).toLocaleDateString("en-GB")
        : null,
      hallTicketDate: listItem?.hallTicketDate
        ? new Date(listItem?.hallTicketDate).toLocaleDateString("en-GB")
        : null,
    }));
    set({
      allJobNotificationList: res,
    });
    return res;
  },

  getAlljobNotificationDetailsById: async (jobId: string) => {
    const res: any = await getJobNotificationDetailByIdAPI(jobId);
    set({
      jobNotificationDetailsByIdList: res,
    });
    return res;
  },
  addNewJobNotification: async (dataObj: any) => {
    const res: any = await addNewJobNotificationAPI(dataObj);
    return res;
  },
  updateJobNotificationDetailById: async (id: string, dataObj: any) => {
    const res: any = await updateJobNotificationDetailByIdAPI(id, dataObj);
    return res;
  },
  deleteJobsNotificationDetailById: async (jobId: string) => {
    const res: any = await deleteJobNotificationDetailByIdAPI(jobId);
    return res;
  },

  //Admission Sections

  addNewAdmsNotification: async (dataObj: any) => {
    const res: any = await addNewAdmsNotificationAPI(dataObj);
    return res;
  },
  updateAdmsNotificationDetailById: async (id: string, dataObj: any) => {
    const res: any = await updateAdmsNotificationDetailByIdAPI(id, dataObj);
    return res;
  },
  getAllAdmsNotificationList: async () => {
    let res: any = await getAllAdmsNotificationAPI();
    res = res.map((listItem: any) => ({
      ...listItem,
      active: listItem?.active ? "True" : "False",
      showBadge: listItem?.showBadge ? "True" : "False",
      applyStartDate: listItem?.applyStartDate
        ? new Date(listItem?.applyStartDate).toLocaleDateString("en-GB")
        : null,
      notificationDate: new Date(listItem?.notificationDate).toLocaleDateString(
        "en-GB"
      ),
      applyEndDate: listItem?.applyEndDate
        ? new Date(listItem?.applyEndDate).toLocaleDateString("en-GB")
        : null,
      examEndDate: listItem?.examEndDate
        ? new Date(listItem?.examEndDate).toLocaleDateString("en-GB")
        : null,
      hallTicketDate: listItem?.hallTicketDate
        ? new Date(listItem?.hallTicketDate).toLocaleDateString("en-GB")
        : null,
      resultDate: listItem?.resultDate
        ? new Date(listItem?.resultDate).toLocaleDateString("en-GB")
        : null,
    }));
    set({
      allAdmsNotificationList: res,
    });
    return res;
  },
  getAllAdmsNotificationByState: async (stateId: string) => {
    const res: any = await getAllAdmsNotificationByStateAPI(stateId);
    set({ admsNotificationDetailsStateIdList: res });
    return res;
  },
  getAllAdmsNotificationDetailsById: async (admId: string) => {
    const res: any = await getAdmsNotificationDetailByIdAPI(admId);
    set({
      admsNotificationDetailsByIdList: res,
    });
    return res;
  },
  deleteAdmsNotificationDetailById: async (admId: string) => {
    const res: any = await deleteAdmsNotificationDetailByIdAPI(admId);
    return res;
  },
}));

export default useAllDataStore;
