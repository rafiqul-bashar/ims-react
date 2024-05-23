export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Store {
  id: number;
  name: string;
  location: string;
}

export interface Permissions {
  canViewProducts: boolean;
  canEditProducts: boolean;
  canDeleteProducts: boolean;
  canAddProducts: boolean;
  canViewOrders: boolean;
  canEditOrders: boolean;
  canDeleteOrders: boolean;
  canAddOrders: boolean;
  canManageUsers: boolean;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  name: string;
  image: string;
  phoneNumber: string;
  address: Address;
  role: string;
  permissions: Permissions;
  store: Store | null;
}

export const adminUser: AdminUser = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  name: "John Doe",
  image:
    "https://plus.unsplash.com/premium_photo-1664392248318-4e1d9361726e?q=80&w=1583&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  phoneNumber: "+1234567890",
  address: {
    street: "123 Admin St.",
    city: "Admin City",
    state: "Admin State",
    zipCode: "12345",
    country: "Admin Country",
  },
  role: "admin",
  permissions: {
    canEditProducts: true,
    canDeleteProducts: true,
    canAddProducts: true,
    canEditOrders: true,
    canDeleteOrders: true,
    canAddOrders: true,
  },
  store: null,
};
