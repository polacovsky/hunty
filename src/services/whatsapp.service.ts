import { Injectable } from '@nestjs/common';
import { MensajeDto } from 'src/dto/mensaje.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import axios from 'axios';
import * as qs from 'qs';
import { Mensaje_SendResponseDto } from 'src/dto/mensaje-sendResponse.dto';
import { Mensaje_SendDto } from 'src/dto/mensaje-send.dto';
import { Pokedex } from 'src/dto/ws_Pokedex';


@Injectable()
export class WhatsappService {
  constructor(
    @InjectKnex() private readonly knex: Knex
  ) { }

  async sendMessage(mensajeIn: Mensaje_SendDto): Promise<Mensaje_SendResponseDto> {

    let data = "";
    if (mensajeIn.url_adjunto) {
      data = JSON.stringify({ "messaging_product": "whatsapp", "recipient_type": "individual", "to": mensajeIn.user_id, "type": "document", "document": { "link": mensajeIn.url_adjunto, "caption": mensajeIn.contenido } });
    } else {
      data = JSON.stringify({ "messaging_product": "whatsapp", "recipient_type": "individual", "to": mensajeIn.user_id, "type": "text", "text": { "preview_url": false, "body": mensajeIn.contenido } });
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/${process.env.WS_VERSION}/${process.env.WS_PHONE_NUMBER_ID}/messages`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WS_BEARER_TOKEN}`
      },
      data: data
    };

    var rtn: Mensaje_SendResponseDto = new Mensaje_SendResponseDto();
    try {
      var rtn_axios = await axios.request(config);
      rtn.id = rtn_axios.data.messages[0].id;
      rtn.error = null
      //SE GUARDA EL REGISTRO EN LA BASE DE DATOS
      var mensaje: MensajeDto = new MensajeDto();
      mensaje.type = 'OUT';
      mensaje.template = false;
      mensaje.url_adjunto = null;
      mensaje.user_id = mensajeIn.user_id;
      mensaje.contenido = mensajeIn.contenido;
      mensaje.id = rtn.id;
      mensaje.fecha_creacion = new Date();
      await this.knex('mensaje').insert(mensaje);
    } catch (error) {
      rtn.id = null;
      rtn.error = error;
    }
    return rtn;
  }

  async reciveMessage(dto: Pokedex) {
    //recorremos todas las entry del dto
    for (let entry of dto.entry) {
      for (let change of entry.changes) {
        //ITERAMOS EN TODOS LOS MENSAJES QUE LLEGARON 
        if (change.value.messages) {
          for (let message of change.value.messages) {
            //INSERTAMOS EL MENSAJE ENTRANTE EN LA BASE DE DATOS                 
            var mensaje: MensajeDto = new MensajeDto();
            mensaje.id = message.id
            mensaje.template = false;
            mensaje.type = 'IN';
            mensaje.user_id = message.from;
            mensaje.contenido = message.type = "text" ? message.text.body : message.type; // POR CUESTION DE TIEMPO SOLO CONTEMPLAMOS LOS MENSAJES DE TIPO TEXTO; 
            mensaje.url_adjunto = null;
            mensaje.fecha_creacion = new Date();
            await this.knex('mensaje').insert(mensaje);
          }
        }

        if (change.value.statuses) {
          //ITERAMOS EN TODOS LOS ESTADOS QUE LLEGARON
          for (let status of change.value.statuses) {
            await this.knex('mensaje').update({ status: status.status } ) .where({ id: status.id });
          }
        }
      }
    }
  }

  async getMessage(): Promise<MensajeDto> {
    var mensaje: MensajeDto = await this.knex.from("mensaje").select("*").first() as MensajeDto;
    return mensaje;
  }
  async getMessageById(id: string): Promise<MensajeDto> {
    var mensaje: MensajeDto = await this.knex.from("mensaje").where({ id }).select("*").first() as MensajeDto;
    return mensaje;
  }
  async getMessageByUserId(user_id: string): Promise<MensajeDto[]> {
    var mensajes: MensajeDto[] = await this.knex.from("mensaje").where({ user_id }).select("*") as MensajeDto[];
    return mensajes;
  }
}