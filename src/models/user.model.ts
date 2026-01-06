export enum EUserStatus {
  'active' = 'active',
  'banned' = 'banned',
}

export enum EUserGender {
  '' = '',
  'male' = 'male',
  'female' = 'female',
}

export enum EUserBase {
  '' = '',
  'สนง.ผบช.' = 'สนง.ผบช.',
  'กกพ.ทภ.1' = 'กกพ.ทภ.1',
  'กขว.ทภ.1' = 'กขว.ทภ.1',
  'กยก.ทภ.1' = 'กยก.ทภ.1',
  'กกบ.ทภ.1' = 'กกบ.ทภ.1',
  'กกร.ทภ.1' = 'กกร.ทภ.1',
  'ร้อย.บก.ทภ.1' = 'ร้อย.บก.ทภ.1',
  'ร้อย.ปจว.ทภ.1' = 'ร้อย.ปจว.ทภ.1',
}

export enum EUserRank {
  '' = '',
  'พล.อ.' = 'พล.อ.',
  'พล.ท.' = 'พล.ท.',
  'พล.ต.' = 'พล.ต.',
  'พ.อ.(พ).' = 'พ.อ.(พ).',
  'พ.อ.' = 'พ.อ.',
  'พ.ท.' = 'พ.ท.',
  'พ.ต.' = 'พ.ต.',
  'ร.อ.' = 'ร.อ.',
  'ร.ท.' = 'ร.ท.',
  'ร.ต.' = 'ร.ต.',
  'ว่าที่ ร.ต.' = 'ว่าที่ ร.ต.',
  'จ.ส.อ.(พ).' = 'จ.ส.อ.(พ).',
  'จ.ส.อ.' = 'จ.ส.อ.',
  'จ.ส.ท.' = 'จ.ส.ท.',
  'จ.ส.ต.' = 'จ.ส.ต.',
  'ส.อ.' = 'ส.อ.',
  'ส.ท.' = 'ส.ท.',
  'ส.ต.' = 'ส.ต.',
  'พลฯ' = 'พลฯ',
  'นาย' = 'นาย',
  'นาง' = 'นาง',
  'น.ส.' = 'น.ส.',
  'ด.ช.' = 'ด.ช.',
  'ด.ญ.' = 'ด.ญ.',
}

export interface IUser {
  id: string;
  displayName: string;
  profileImageUrl: string;
  lineId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  rank: EUserRank;
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
  index: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  id: string;
  history: IUserScoreHistory[];
  user: IUser;
  sumDistance: number;
}

export enum EUserScoreHistoryStatus {
  'approved' = 'approved',
  'pending' = 'pending',
  'rejected' = 'rejected',
}

export interface IUserScoreHistory {
  index: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  id: string;
  time: number;
  distance: number;
  imageUrl: string;
  status: EUserScoreHistoryStatus;
}
