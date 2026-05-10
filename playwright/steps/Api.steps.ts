import { APIResponse, expect } from '@playwright/test';
import { step } from '@lib/tools/step.decorator';
import InvBgApi from '@lib/api/Inv.bg.api';
import jp from 'jsonpath';

export default class ApiSteps {
  protected response: APIResponse;

  constructor(private invBgApi: InvBgApi) {
    this.response = {} as APIResponse;
  }

  @step('Generate token')
  async postGenerateToken(email: string, password: string) {
    this.response = await this.invBgApi.postGenerateToken(email, password);
  }

  @step('Get Items List')
  async getItemsList() {
    this.response = await this.invBgApi.getItemsList();
  }

  @step('Get Item')
  async getItem(id: number) {
    this.response = await this.invBgApi.getItem(id);
  }

  @step('Create Item')
  async postCreateItem() {
    this.response = await this.invBgApi.createItem();
  }

  @step('Update Item')
  async patchUpdateItem(id: number) {
    this.response = await this.invBgApi.updateItem(id);
  }

  @step('Delete Item')
  async deleteItem(id: number) {
    this.response = await this.invBgApi.deleteItem(id);
  }

  @step('Get Element Value')
  async getElementValue(jsonPath: string) {
    const responseBody = await this.response.json();
    const elementValue = jp.query(responseBody, jsonPath)[0];
    return elementValue;
  }

  @step('Verify Response Status')
  async verifyResponseStatus(status: number) {
    const expectedStatus = this.response.status();
    expect(status, 'Verify token key exists in response body').toEqual(expectedStatus);
  }

  @step('Verify Element present in response body')
  async verifyTokenExists() {
    const responseBody = await this.response.json();
    expect(responseBody.token, 'Verify token key exists in response body').toBeTruthy();
    process.env.TOKEN = responseBody.token;
  }

  @step('Verify Element Value in response body')
  async verifyElementValue(jsonPath: string, expectedValue: number) {
    const responseBody = await this.response.json();
    const actualValue = jp.query(responseBody, jsonPath)[0];
    expect(actualValue, 'Verify Element Value').toBe(expectedValue);
  }

  @step('Verify Element Value in response body')
  async verifyElementStringValue(jsonPath: string, expectedValue: string) {
    const responseBody = await this.response.json();
    const actualValue = jp.query(responseBody, jsonPath)[0];
    expect(actualValue, 'Verify Element Value').toBe(expectedValue);
  }

  @step('Verify Expected Response body')
  async verifyExpectedResponsebody(expectedResponseBody) {
    const actualResponseBody = await this.response.json();
    console.log(actualResponseBody);
    expect(actualResponseBody, 'Verify Element Value').toEqual(expectedResponseBody);
  }
}
