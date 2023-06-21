import { ApiProperty } from '@nestjs/swagger';
import { Entry } from './ws_Entry';

    
export class  Pokedex {
    @ApiProperty()
    object: string;
    @ApiProperty( {type: [Entry]})
    entry:  Entry[];
}


