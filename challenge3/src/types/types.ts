//Thomas
export type Logindata = {
  email: string;
  password: string;
};
export type Tokendata = {
  refresh: string;
  token: string;
};

export type Registrationdata = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  department:
    | string
    | "CodingSchool"
    | "Diamir"
    | "WebundSoehne"
    | "DarwinsLab"
    | "DeepDive"
    | "TailoredApps";
};
export type Office = {
  name: string;
  columns: number;
  rows: number;
  id: string;
  map: string;
  createdAt: string;
  updatedAt: string;
  desks?: Desk[]; //optionales Feld wird nur bei verwendung mitgeschickt für weniger ladezeit
};
export interface Desk {
  id: string;
  label: string;
  type: string;
  bookings: Booking[];
  equipment: string[];
  column: number;
  row: number;
  office: {
    name: string;
  };
  fixdesk?: {
    user: {
      firstname: string;
      lastname: string;
      email: string;
    };
  };
}

export interface Booking {
  desk: any;
  dateStart: string;
  dateEnd: string;
  id: string;
  user: {
    firstname: string;
    lastname: string;
  };
  bookedAt: string;
}
export interface FixdeskRequest {
  id: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    department: string;
    id: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  };
  desk: {
    label: string;
    id: string;
    equipment: string[];
    type: string;
    row: number;
    column: number;
    office: {
      name: string;
    };
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: {
    firstname: string;
    lastname: string;
    email: string;
    department: string;
    id: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

//Z
export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  department: string;
  createdAt: string;
  updatedAt: string;
};
export type userProfile = {
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  password: string;
};
