import { ApiProperty } from '@nestjs/swagger';
import { Message } from './ws_Message';


export class ws_Register {
    @ApiProperty()
    "hub.mode": string;
    @ApiProperty()
    "hub.challenge": string;
    @ApiProperty()
    "hub.verify_token": String;
}


