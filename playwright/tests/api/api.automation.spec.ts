import { test } from '@tests/steps/fixtures';

// API Documentation: https://api.inv.bg/v3/swagger-ui/

test(`Get Items`, { tag: '@api' }, async ({ apiSteps }) => {
  await apiSteps.getItemsList();
  await apiSteps.verifyElementValue('$.total', 16);
});

test(`Create and Delete item`, { tag: '@api' }, async ({ apiSteps }) => {
  await apiSteps.postCreateItem();
  await apiSteps.verifyResponseStatus(201);
  const id: number = await apiSteps.getElementValue('$.id');

  await apiSteps.getItem(id);
  await apiSteps.verifyResponseStatus(200);
  await apiSteps.verifyElementStringValue('$.name', '');
  await apiSteps.verifyElementValue('$.price', 0.25);
  await apiSteps.verifyElementStringValue('$.currency', 'BGN');
  await apiSteps.verifyElementValue('$.price_for_quantity', 1);
  await apiSteps.verifyElementStringValue('$.quantity_unit', 'кг.');

  await apiSteps.patchUpdateItem(id);
  await apiSteps.verifyResponseStatus(204);
  await apiSteps.getItem(id);
  await apiSteps.verifyResponseStatus(200);
  await apiSteps.verifyElementStringValue('$.name', 'Дъвка Турбо');

  await apiSteps.deleteItem(id);
  await apiSteps.verifyResponseStatus(204);
});
