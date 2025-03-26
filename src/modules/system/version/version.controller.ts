import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Post()
  create(@Body() createVersionDto: CreateVersionDto) {
    return this.versionService.create(createVersionDto);
  }

  @Get()
  findAll() {
    // return this.versionService.findAll();
    return '0.0.1';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersionDto: UpdateVersionDto) {
    return this.versionService.update(+id, updateVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionService.remove(+id);
  }
}
