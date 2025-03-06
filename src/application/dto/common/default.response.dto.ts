import { 
    CustomStatusCodes, 
    CustomStatusMessages 
} from "src/domain/value-object";

class Status {
    public timestamp: string;
    public code: CustomStatusCodes;
    public message: string;

    constructor(code: CustomStatusCodes, message?: string, timestamp: string = new Date().toISOString()) {
        this.timestamp = timestamp;
        this.code = code;
        this.message = message ?? CustomStatusMessages[code];
    }
}

class Pagination {
    public currentPage: number;
    public totalPages: number;
    public itemsPerPage: number;

    constructor(currentPage: number, totalPages: number, itemsPerPage: number) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.itemsPerPage = itemsPerPage;
    }
}

class DefaultResponseDto {
    public status: Status;
    public data: any;
    public pagination?: Pagination;
    
    constructor(code: CustomStatusCodes, data: any = {}, pagination?: Pagination) {
        this.status = new Status(code);
        this.data = data;
        if (pagination) this.pagination = pagination;
    }
}

export { DefaultResponseDto, Status, Pagination }
