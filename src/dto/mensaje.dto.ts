import { ApiProperty } from '@nestjs/swagger';

export class MensajeDto   {
    @ApiProperty()
    id: string;

    @ApiProperty()
    user_id: string;

    @ApiProperty()
    type: string;  // IN -OUT 
    
    @ApiProperty()
    template: boolean

    @ApiProperty()
    contenido: string

    @ApiProperty()
    url_adjunto: string    

    @ApiProperty()
    fecha_creacion: Date;

}
