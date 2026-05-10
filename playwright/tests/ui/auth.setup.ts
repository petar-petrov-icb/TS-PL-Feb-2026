import { test as setup } from '@tests/steps/fixtures';
import { Credentials } from '@lib/resourses/enums/Credentials';
import path from 'path';

// const authFile = path.join(__dirname, '..', '../.auth/user.json');
const authFile = path.resolve(process.cwd(), 'auth', 'user.json');

setup('authenticate', async ({ sharedSteps, page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await sharedSteps.navigateToSite('https://st2016.inv.bg/login/');
  await sharedSteps.login(Credentials.EMAIL, Credentials.PASSWORD); // Wait until the page receives the cookies.
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});