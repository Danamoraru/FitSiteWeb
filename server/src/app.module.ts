import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { TrainersModule } from './trainers/trainers.module.js';
import { AppService } from './app.service.js';
import { FitnessClassesModule } from './fitness-classes/fitness-classes.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'fitbook',
      password: 'fitbook123',
      database: 'fitbook_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    FitnessClassesModule,
    TrainersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }