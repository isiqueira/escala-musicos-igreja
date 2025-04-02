import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AppWorld } from '../support/world';

Given('que existe a igreja {string}', async function (this: AppWorld, churchName: string) {
  this.church = await this.prisma.church.create({
    data: { name: churchName }
  });
});

When('eu crio uma escala para {string} com esses músicos', 
  async function (this: AppWorld, date: string) {
    this.response = await this.app.inject({
      method: 'POST',
      url: '/api/schedules',
      payload: {
        date: new Date(date).toISOString(),
        churchId: this.church.id,
        musicianIds: this.musicians.map(m => m.id)
      }
    });
  }
);

Then('a escala deve ser registrada no sistema', function (this: AppWorld) {
  expect(this.response.statusCode).to.equal(201);
});