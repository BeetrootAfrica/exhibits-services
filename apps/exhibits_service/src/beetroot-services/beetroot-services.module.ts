import { Module, forwardRef } from '@nestjs/common';
import { BeetrootServicesService } from './beetroot-services.service';
import { BeetrootServicesGateway } from './beetroot-services.gateway';
import { JwtService } from '@nestjs/jwt';
// import SearchService from '../search/search.service';
import { SocketService } from '../sockets-gateway/service';
import { HttpModule } from '@nestjs/axios';
// import { SearchModule } from '../search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExhibitService } from './exhibit-service';
import { ExhibitImage, Question, Questionnaire, QuestionnaireSection } from './entities/questionaire.entity';
import { QuestionService } from './question-service';
import { Editor } from './entities/beetroot-service.entity';
import { Exhibit, Dialogue, QuestionAnswer, Responses } from './entities/exhibit.entity';
import { BeetrootServicesController } from './beetroot-services.controller';
import { MigrationService } from './migration-service';
import { SocketServicesModule} from '../sockets-gateway/socket-services.module'
@Module({
  imports: [
    // forwardRef(() => SearchModule),
    forwardRef(() => HttpModule),
    forwardRef(() => SocketServicesModule),
    TypeOrmModule.forFeature([
      Questionnaire,
      QuestionnaireSection,
      Question,
      Exhibit,
      Dialogue,
      Editor,
      ExhibitImage,
      QuestionAnswer, 
      Responses
    ]),
  ],
  controllers: [
    BeetrootServicesController
  ],
  exports: [TypeOrmModule],
  providers: [
    BeetrootServicesGateway,
    BeetrootServicesService,
    ExhibitService,
    QuestionService,
    SocketService,
    // SearchService,
    MigrationService,
    JwtService,

  ],
})
export class BeetrootServicesModule {}
