export const AppPort = 3000;

export enum QueryOrderByCodes {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum CustomStatusCodes {
  SUCCESS = 0,
  ERROR = 999,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
}

export const CustomStatusMessages: { [key in CustomStatusCodes]: string } = {
  [CustomStatusCodes.SUCCESS]: '성공적으로 처리되었습니다.',
  [CustomStatusCodes.ERROR]: '서비스가 원활하지 않습니다. 잠시 후 재시도 부탁드립니다.',
  [CustomStatusCodes.NOT_FOUND]: '요청하신 데이터를 찾을 수 없습니다.',
  [CustomStatusCodes.UNAUTHORIZED]: '인증되지 않은 사용자입니다.',
  [CustomStatusCodes.FORBIDDEN]: '권한이 없습니다.',
  [CustomStatusCodes.BAD_REQUEST]: '잘못된 요청입니다.',
};


