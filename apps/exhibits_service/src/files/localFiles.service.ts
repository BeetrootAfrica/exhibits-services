import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LocalFile from './localFile.entity';

@Injectable()
class LocalFilesService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) { }

  async saveLocalFileData(fileData: LocalFileDto) {
    const newFile = await this.localFilesRepository.create(fileData)
    await this.localFilesRepository.save(newFile);
    return newFile;
  }
  
  async getFileById(id: string) {
    const file = await this.localFilesRepository.findOne({ where: { id: id } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}

export default LocalFilesService;
