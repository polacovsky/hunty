import { ApiProperty } from '@nestjs/swagger';
import { Message } from './ws_Message';
import { Status } from './ws_Status';


export class Value {
    @ApiProperty()
    messaging_product: string;
    @ApiProperty({type:[Message]})
    messages: Message[];
    @ApiProperty({type:[Status]})
    statuses: Status[];
}


