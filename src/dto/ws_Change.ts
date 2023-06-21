import { ApiProperty } from '@nestjs/swagger';
import { Value } from './ws_Value';
export class Change  {
    @ApiProperty({type:Value})
    value:    Value;
    @ApiProperty()
    field: string
}


