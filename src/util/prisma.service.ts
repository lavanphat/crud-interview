import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const { model } = params;
      if (model === 'User') {
        this.beforeUpsertUser(params);
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private beforeUpsertUser(params: Prisma.MiddlewareParams) {
    const { action, args } = params;
    if (action !== 'create' && action !== 'update') return;

    const { data } = args;
    if (data.password) data.password = hashSync(data.password, 10);
  }
}
