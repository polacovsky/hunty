import { ApiProperty } from '@nestjs/swagger';
export class Mensaje_SendDto {
   

    @ApiProperty()
    user_id: string;
       
    @ApiProperty()
    contenido: string;
  
    @ApiProperty()
    url_adjunto: string
}
