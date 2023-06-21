import { Controller, Get, Post, Body,InternalServerErrorException,Query, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { WhatsappService } from '../services/whatsapp.service';
import { Mensaje_SendDto } from 'src/dto/mensaje-send.dto';
import { Mensaje_SendResponseDto } from 'src/dto/mensaje-sendResponse.dto';
import { Pokedex } from 'src/dto/ws_Pokedex';
import { ws_Register } from 'src/dto/ws_Register';
import { MensajeDto } from 'src/dto/mensaje.dto';

@ApiBearerAuth()
@ApiTags('Whatsapp')
@Controller('whatsapp')
export class UsuariosController {
  constructor(private readonly service: WhatsappService) { }


  @Get('WebhookWhatsApp')
  @ApiResponse({ status: 200, type: String, description: "WEBHOOK PARA REGISTRO DE APLICACIÓN DE WHATSAPP" })
  async registerWebhook(@Query() query: ws_Register ): Promise<string> {
    try {
      var rtn =  query['hub.challenge']??'';
      return rtn;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('WebhookWhatsApp')
  @ApiResponse({ status: 200, type: Boolean, description: "WEBHOOK PARA RECEPCIÓN DE MENSAJES Y ESTADOS" })
  async reciveMessagePost(@Body() dto: Pokedex) {
    try {
      await this.service.reciveMessage(dto);      
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  @Post('message')
  @ApiResponse({ status: 200, type: Mensaje_SendResponseDto, description: "ENDPOINT PARA ENVÍO DE MENSAJES" })
  async sendMessage(@Body() dto: Mensaje_SendDto): Promise<Mensaje_SendResponseDto> {
    try {
      var rsp = await this.service.sendMessage(dto);
      return rsp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  @Get('messages/by_id/:id')
  @ApiParam({name: 'id'})
  @ApiResponse({ status: 200, type: String, description: "ENDPOINT PARA CONSULTAR MENSAJES POR ID" })
  async getMessageById(@Param() param: { id: string } ): Promise<MensajeDto> {
    try {     
      return this.service.getMessageById(param.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('messages/by_user/:user_id')
  @ApiParam({name: 'user_id'})
  @ApiResponse({ status: 200, type: String, description: "ENDPOINT PARA CONSULTAR MENSAJES POR USER ID" })
  async getMessageByUserId(@Param() param: { user_id: string } ): Promise<MensajeDto[]> {
    try {      
      return this.service.getMessageByUserId(param.user_id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
    
}