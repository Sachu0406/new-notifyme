export type GenericObject = { [key: string]: any };

export interface states {
  stateName: string;
  stateId: number;
}

export interface UseFetchResult {
  data: GenericObject | null;
  isPending: boolean;
  error: any | null;
}

export interface iAllNotification {
  id: number | string;
  name: string;
  notificationDate: string;
  applyStartDate: string;
  applyEndDate: string;
  hallTicket: string;
  examStartDate: string;
  examEndDate: string;
  result: string;
  remarks: string;
  showBadge: boolean;
  active: boolean;
}

export interface iState {
  _id: number | string;
  stateId: number;
  shortName: string;
  stateName: string;
  districts: [];
}

export interface iStateFormData {
  firstName: string;
  lastName: string;
  username: string;
  city: string;
  state: string;
  zip: string;
  acceptTerms: boolean;
}

export interface iStateFormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  city?: string;
  state?: string;
  zip?: string;
  acceptTerms?: string;
}
