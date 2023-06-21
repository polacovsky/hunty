import { ApiProperty } from '@nestjs/swagger';
import { Text } from './ws_Text';
export class Message {
    @ApiProperty( )
    from:      string;
    @ApiProperty()
    id:        string;
    @ApiProperty()
    timestamp: string;
    @ApiProperty({type: Text})
    text:      Text;
    @ApiProperty()
    type:      string;
}


