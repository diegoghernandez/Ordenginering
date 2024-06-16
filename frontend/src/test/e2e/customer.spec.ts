import { changeCustomerHandler } from '@/mocks/domains/changeCustomerHandler'
import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from './utils/navbarUtils'
import { getProfileLinks } from '@/utils/getProfileLinks'

test.describe('Customer page e2e tests', () => {
   test.beforeEach(async ({ page, context, worker }) => {
      await context.addCookies([{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' }])

      await page.goto('/client/customer/32')
      await page.waitForLoadState('load')
      await worker.use(...changeCustomerHandler)
   })

   test('Should render correctly', async ({ page }) => {
      await findNavbarElements(page)
      await expect(page).toHaveTitle('Customer page')

      getProfileLinks(32, 'ADMIN', 'PROFILE').forEach(async ({ name }) => {
         await expect(page.getByRole('link', { name })).toBeVisible()
      })
      await expect(page.getByRole('link', { name: 'Profile' })).toHaveClass('active')

      await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
      const profileArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Profile' }) })
      await expect(profileArticle.getByLabel('Name')).toBeVisible()
      await expect(profileArticle.getByLabel('Birth Date')).toBeVisible()
      await expect(profileArticle.getByRole('button', { name: 'Save Changes' })).toBeVisible()
      
      await expect(page.getByRole('heading', { name: 'Password' })).toBeVisible()
      const passwordArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Password' }) })
      await expect(passwordArticle.getByLabel('Current password')).toBeVisible()
      await expect(passwordArticle.getByLabel('New password')).toBeVisible()
      await expect(passwordArticle.getByLabel('Repeat password')).toBeVisible()
      await expect(passwordArticle.getByRole('button', { name: 'Save Password' })).toBeVisible()

      await expect(page.getByRole('heading', { name: 'Email Address' })).toBeVisible()
      const emailArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Email Address' }) })
      await expect(emailArticle.getByLabel('Current Email Address')).toBeVisible()
      await expect(emailArticle.getByLabel('Current Email Address')).toBeDisabled()
      await expect(emailArticle.getByLabel('Current Password')).toBeVisible()
      await expect(emailArticle.getByLabel('New Email Address')).toBeVisible()
      await expect(emailArticle.getByRole('button', { name: 'Save Email' })).toBeVisible()
   })

   test.describe('Profile form tests', () => {
      test('Should full the formulary and get a error message', async ({ page }) => {         
         const profileArticle =  page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Profile' }) })

         await profileArticle.getByLabel('Name').fill('New name')
         await profileArticle.getByLabel('Birth Date').fill('2020-02-02')
      

         await profileArticle.getByRole('button', { name: 'Save changes' }).click()

         await expect(profileArticle.getByText('Warning')).toBeVisible()
         await expect(profileArticle.getByText('No older enough')).toBeVisible()
      })

      test('Should full the formulary and change the profile information correctly', async ({ page }) => {
         const profileArticle =  page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Profile' }) })

         await profileArticle.getByLabel('Name').fill('New name')
         await profileArticle.getByLabel('Birth Date').fill('1990-02-02')

         await profileArticle.getByRole('button', { name: 'Save changes' }).click()

         await expect(profileArticle.getByText('Success')).toBeVisible()
         await expect(profileArticle.getByText('Change profile correctly')).toBeVisible()
      })
   })

   test.describe('Password form tests', () => {
      test('Should full the formulary and get a error message', async ({ page }) => {         
         const passwordArticle =  page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Password' }) })

         await passwordArticle.getByLabel('Current password').fill('wrong')
         await passwordArticle.getByLabel('New password').fill('1234')
         await passwordArticle.getByLabel('Repeat password').fill('1234')
      

         await passwordArticle.getByRole('button', { name: 'Save password' }).click()

         await expect(passwordArticle.getByText('Warning')).toBeVisible()
         await expect(passwordArticle.getByText('Incorrect password')).toBeVisible()
      })

      test('Should full the formulary and change the password correctly', async ({ page }) => {
         const passwordArticle =  page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Password' }) })

         await passwordArticle.getByLabel('Current password').fill('correct')
         await passwordArticle.getByLabel('New password').fill('1234')
         await passwordArticle.getByLabel('Repeat password').fill('1234')

         await passwordArticle.getByRole('button', { name: 'Save password' }).click()

         await expect(passwordArticle.getByText('Success')).toBeVisible()
         await expect(passwordArticle.getByText('Change password correctly')).toBeVisible()
      })
   })

   test.describe('Email form tests', () => {
      test('Should full the formulary and get a error message', async ({ page }) => {         
         const emailArticle =  page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Email Address' }) })

         await emailArticle.getByLabel('Current Password').fill('wrong')
         await emailArticle.getByLabel('New Email Address').fill('newemail@new.com')
      

         await emailArticle.getByRole('button', { name: 'Save email' }).click()

         await expect(emailArticle.getByText('Warning')).toBeVisible()
         await expect(emailArticle.getByText('Incorrect password')).toBeVisible()
      })
      
      test('Should full the formulary and change the email correctly', async ({ page }) => {         
         const emailArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Email Address' }) })

         await emailArticle.getByLabel('Current Password').fill('correct')
         await emailArticle.getByLabel('New Email Address').fill('newemail@new.com')
      

         await emailArticle.getByRole('button', { name: 'Save email' }).click()

         await expect(emailArticle.getByText('Success')).toBeVisible()
         await expect(emailArticle.getByText('Change email correctly')).toBeVisible()
      })
   })
})