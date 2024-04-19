import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  fetch() {
    return this.contactService.fetch();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  // @Patch()
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // update(@Body() updateContactDto: UpdateContactDto) {
  //   console.log('hey');
  //   return this.contactService.update(updateContactDto);
  // }

  @Patch()
  @UsePipes()
  update(@Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(updateContactDto);
  }
}
