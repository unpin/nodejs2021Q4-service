import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';

import { FileService } from './file.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  async uploadFile(
    @Req() req: Request | FastifyRequest,
    @Res() res: Response | FastifyReply,
  ) {
    if (process.env.USE_FASTIFY === 'true') {
      return this.fileService.uploadFileFastify(
        req as FastifyRequest,
        res as FastifyReply,
      );
    } else {
      return this.fileService.uploadFileExpress(
        req as Request,
        res as Response,
      );
    }
  }

  @Get(':filename')
  download(@Param('filename') filename: string) {
    return this.fileService.downloadFile(filename);
  }
}
