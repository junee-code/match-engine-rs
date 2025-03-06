import { IsOptional, IsInt, IsString } from "class-validator";
import { Expose, Type } from "class-transformer";
import { PaginationVO } from "src/domain/value-object";

export class BaseListRequestDto {
  @IsOptional()
  @IsInt() //숫자 정수만 허용
  @Type(() => Number) //문자열을 숫자로 변환
  @Expose()
  page?: number = PaginationVO.DEFAULT_PAGE;

  @IsOptional()
  @IsInt() //숫자 정수만 허용
  @Type(() => Number) //문자열을 숫자로 변환
  @Expose()
  limit?: number = PaginationVO.DEFAULT_PER_PAGE;

  @IsOptional()
  @IsString()
  @Expose()
  order?: string;
}
