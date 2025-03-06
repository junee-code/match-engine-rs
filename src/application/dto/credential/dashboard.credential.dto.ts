import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseListRequestDto } from "../base";
export class AnnouncementCredentialsDto extends BaseListRequestDto {

  @IsString()
  @IsOptional()
  //@IsNotEmpty()
  title?: string;
}