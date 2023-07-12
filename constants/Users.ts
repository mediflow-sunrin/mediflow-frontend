export interface Building {
  id: number;
  name: string;
  address: string;
  contact: string;
  exit: string[];
}

export interface User {
  uuid: string;
  id: string;
  name: string;
  password: Promise<string>;
  isAdmin: boolean;
  building: Building;
}
