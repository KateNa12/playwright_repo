import { test, expect, Locator } from '@playwright/test';
import AuthController from '../api-controllers/AuthController';
import CarsController from '../api-controllers/CarsController';
import { USERS } from '../test-data/creds/users'

test.describe(("HW28.2 API test cases"), () => {
  let authController: AuthController;
  let carsController: CarsController;
  let sid;

  test.beforeAll(async ({request}) => {
    authController = new AuthController(request);
    sid = await authController.signInAndGetCookie(USERS.mainUser.email, USERS.mainUser.password)
  });

  test.beforeEach(async ({request})=> {
    authController = new AuthController(request);
    carsController = new CarsController(request);
  })

  test('Main user can add Fiat Palio', async() => {
    const response = await carsController.addCar(5, 19, 1234, sid);

    expect(response.data.brand).toBe('Fiat');
    expect(response.data.model).toBe('Palio');
  });

  
  test('Main user can not add car with empty mileage', async() => {
    const response = await carsController.addCarNegative(1, 1, sid);

    expect(response.message).toBe('Mileage is required');
  });

  
  test('Main user can not add car with extra mileage', async() => {
    const response = await carsController.addCar(3, 12, 9999881, sid);

    expect(response.message).toBe('Mileage has to be from 0 to 999999');
  });
});