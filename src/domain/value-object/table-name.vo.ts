export const TABLE_NAMES = {
  DASHBOARD: 'dashboard',
  USERS: 'users',
  ORDERS: 'orders',
  PRODUCTS: 'products',
} as const; // as const를 사용하면 객체 속성이 readonly로 고정됨

export type TableNameType = keyof typeof TABLE_NAMES;