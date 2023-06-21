import { UsuariosController as WhatsappController } from 'src/controllers/whatsapp.controller';
import { WhatsappService } from 'src/services/whatsapp.service';
import { Module, CacheModule } from '@nestjs/common';
@Module({    
    controllers: [WhatsappController],
    providers: [WhatsappService,]
})
export class MaestrosModule {


}