import { ApiProperty } from '@nestjs/swagger';
import { Message } from './ws_Message';


export class Status {
    @ApiProperty()
    id: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    recipient_id: string;

}


