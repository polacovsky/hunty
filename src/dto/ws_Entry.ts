import { ApiProperty } from '@nestjs/swagger';
import { Change } from './ws_Change';
export class Entry  {
    @ApiProperty()
    id:      string;
    @ApiProperty({type:[Change]})
    changes: Change[];
}