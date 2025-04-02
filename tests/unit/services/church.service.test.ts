import prisma from "../../../src/lib/prisma";
import { churchService } from "../../../src/services/church.service";
import { churchFixture } from "../../fixtures/churches";


describe('ChurchService', () => {
  afterEach(async () => {
    await prisma.church.deleteMany();
  });

  it('should create and find a church', async () => {
    const church = await churchService.createChurch(churchFixture);
    const found = await churchService.getChurchById(church.id);
    
    expect(found).toMatchObject({
      name: churchFixture.name
    });
  });

  it('should return null for non-existent church', async () => {
    const found = await churchService.getChurchById('non-existent-id');
    expect(found).toBeNull();
  });
});
