export enum EUserStatus {
  'active' = 'active',
  'banned' = 'banned',
}

export enum EUserGender {
  'male' = 'male',
  'female' = 'female',
}

export enum EUserBase {
  'สนง.ผบช.' = 'สนง.ผบช.',
  'กกพ.ทภ.1' = 'กกพ.ทภ.1',
  'กขว.ทภ.1' = 'กขว.ทภ.1',
  'กยก.ทภ.1' = 'กยก.ทภ.1',
  'กกบ.ทภ.1' = 'กกบ.ทภ.1',
  'กกร.ทภ.1' = 'กกร.ทภ.1',
  'ร้อย.บก.ทภ.1' = 'ร้อย.บก.ทภ.1',
  'ร้อย.ปจว.ทภ.1' = 'ร้อย.ปจว.ทภ.1',
}

export interface IUser {
  id: string;
  displayName: string;
  profileImageUrl: string;
  lineId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  rank: string;
  firstName: string;
  lastName: string;
  gender: EUserGender;
  base: EUserBase;
  status: EUserStatus;
  score: {
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    id: string;
  };
}

export interface IUserScoreInfo {
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  id: string;
  history: [];
  user: IUser;
  sumDistance: number;
}

export interface IUserScoreHistory {
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  id: string;
  time: number;
  distance: number;
  imageUrl: string;
}
