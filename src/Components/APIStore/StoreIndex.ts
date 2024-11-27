export type store = {
  stateList: Array<any>;
  getAllStates: () => void;

  allNotificationList: [];
  getAllNotificationList: () => void;
  addNewNotification: (dataObj: any) => void;
  updateNotificationDetailById: (id: string, dataObj: any) => void;
  deleteNotificationDetailById: (id: string) => void;


  allJobNotificationList: [];
  jobNotificationDetailsByIdList: [];
  jobNotificationDetailsStateIdList: [];
  getAllJobNotificationList: () => void;
  getAlljobNotificationDetailsById: (jobId: string) => void;
  addNewJobNotification: (dataObj: any) => void;
  updateJobNotificationDetailById: (id: string, dataObj: any) => void;
  getAllJobNotificationByState: (stateId: string) => void;
  allAdmsNotificationList: [];
  getAllAdmsNotificationList: () => void;
  addNewAdmsNotification: (dataObj: any) => void;
  updateAdmsNotificationDetailById: (id: string, dataObj: any) => void;
  admsNotificationDetailsStateIdList: [];
  getAllAdmsNotificationByState: (stateId: string) => void;
  admsNotificationDetailsByIdList: [];
  getAllAdmsNotificationDetailsById: (id: string) => void;
  deleteJobsNotificationDetailById: (id: string) => void;
  deleteAdmsNotificationDetailById: (id: string) => void;
  visitorsCount: [];
  getVisitorsCount: () => void;
  AuthenticateUser: (dataObj: any) => void;
  RegisterUser: (dataObj: any) => void;
};
