import {  Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { MaestrosModule } from './modules/whatsapp.module';

console.log()

@Module({
  imports: [
    //KNEX
    KnexModule.forRoot({
      config: {
        client: "mssql",
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          requestTimeout: 750000,
          connectionTimeout: 5000
        },
        pool: {
          min: 2,
          max: 300,
          createTimeoutMillis: 3000,
          acquireTimeoutMillis: 30000,
          idleTimeoutMillis: 30000,
          reapIntervalMillis: 1000,
          createRetryIntervalMillis: 100,
          propagateCreateError: false
        }
      },
    }),
    //MODULOS
    MaestrosModule, 
  ],  

})
export class AppModule {
    
 }


