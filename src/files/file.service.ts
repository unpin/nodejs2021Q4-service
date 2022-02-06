import * as fs from 'fs';
import * as stream from 'stream';
import * as util from 'util';
import { stat } from 'fs/promises';
import { join } from 'path';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import * as multer from 'multer';
import * as fastify from 'fastify';
import { Request, Response } from 'express';

const FILE_SIZE_LIMIT = 32 * 1024 * 1024;

@Injectable()
export class FileService {
  upload = multer({
    limits: { files: 1, fileSize: FILE_SIZE_LIMIT },
    storage: multer.diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  });

  uploadFileExpress(req: Request, res: Response) {
    this.upload.single('file')(req, res, (err) => {
      if (err) {
        throw new HttpException(err.message, 400);
      }
      res.send({
        message: 'File has been successfully uploaded',
        filename: req.file.filename,
        url: encodeURI(
          `http://localhost:${process.env.PORT}/file/${req.file.filename}`,
        ),
      });
    });
  }

  async uploadFileFastify(
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply,
  ) {
    req.multipart(async (field, file, filename) => {
      const pipeline = util.promisify(stream.pipeline);
      const writeStream = fs.createWriteStream(`uploads/${filename}`);
      try {
        await pipeline(file, writeStream);
        res.code(200).send({
          message: 'File has been successfully uploaded',
          filename: filename,
          url: encodeURI(
            `http://localhost:${process.env.PORT}/file/${filename}`,
          ),
        });
      } catch (err) {
        Logger.error(err);
        throw new InternalServerErrorException('Something went wrong');
      }
    }, onEnd);

    async function onEnd(err: Error) {
      if (err) {
        Logger.error(err);
        res.send(new InternalServerErrorException('Internal server error'));
        return;
      }
    }
  }

  async downloadFile(filename: string) {
    const filePath = join(process.cwd(), `./uploads/${filename}`);
    try {
      await stat(filePath);
      return new StreamableFile(fs.createReadStream(filePath));
    } catch (error) {
      Logger.debug(error);
      throw new NotFoundException('File not found!');
    }
  }
}
