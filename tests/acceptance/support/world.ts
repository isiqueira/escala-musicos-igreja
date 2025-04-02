import { PrismaClient } from '@prisma/client';
import { buildApp } from '../../../src/app';
import { After, Before } from '@cucumber/cucumber';

export class AppWorld {
  public app: any;
  public prisma = new PrismaClient();
  public church: any;
  public musicians: any[] = [];
  public response: any;

  async start() {
    this.app = await buildApp();
  }

  async cleanup() {
    await this.prisma.schedule.deleteMany();
    await this.prisma.musician.deleteMany();
    await this.prisma.church.deleteMany();
    await this.app.close();
  }
}

Before(async function (this: AppWorld) {
  await this.start();
});

After(async function (this: AppWorld) {
  await this.cleanup();
});