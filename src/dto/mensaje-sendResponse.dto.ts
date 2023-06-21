import { ApiProperty } from '@nestjs/swagger';
export class Mensaje_SendResponseDto {
   

    @ApiProperty()
    id: string;
       
    @ApiProperty()
    error: any;
  
}
