import { changeCustomerHandler } from '@/mocks/domains/changeCustomerHandler'
import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'
import { getProfileLinks } from '@/utils/getProfileLinks'

const locale = 'en'

const customerTranslation = getJSON('../i18n/pages/Customer.json')
const t = customerTranslation[locale]

test.describe('Customer page e2e tests', () => {
   test.beforeEach(async ({ page, context, worker }) => {
      await context.addCookies([{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' }])

      await page.goto('/client/en/customer/32')
      await page.waitForLoadState('load')
      await worker.use(...changeCustomerHandler)
   })

   test('Should render correctly', async ({ page }) => {
      await findNavbarElements(locale, page)
      await expect(page).toHaveTitle(t.seo.title)

      getProfileLinks({
         customerId: 32, 
         role: 'ADMIN', 
         active: 'INGREDIENT'
      }).forEach(async ({ name }) => {
         await expect(page.getByRole('link', { name })).toBeVisible()
      })

      
      const { profile } = getJSON('../i18n/components/profileLinks.json')[locale]
      await expect(page.getByRole('link', { name: profile })).toHaveClass('active')

      const { profileFormTraduction, passwordFormTraduction, emailFormTraduction } = t

      await expect(page.getByRole('heading', { name: profileFormTraduction.title })).toBeVisible()
      const profileArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: profileFormTraduction.title }) })
      await expect(profileArticle.getByLabel(profileFormTraduction.labels.name)).toBeVisible()
      await expect(profileArticle.getByLabel(profileFormTraduction.labels.birthDate)).toBeVisible()
      await expect(profileArticle.getByRole('button', { name: profileFormTraduction.submitLabel })).toBeVisible()
      
      await expect(page.getByRole('heading', { name: passwordFormTraduction.title })).toBeVisible()
      const passwordArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: passwordFormTraduction.title }) })
      await expect(passwordArticle.getByLabel(passwordFormTraduction.labels.currentPassword)).toBeVisible()
      await expect(passwordArticle.getByLabel(passwordFormTraduction.labels.newPassword)).toBeVisible()
      await expect(passwordArticle.getByLabel(passwordFormTraduction.labels.repeatPassword)).toBeVisible()
      await expect(passwordArticle.getByRole('button', { name: passwordFormTraduction.submitLabel })).toBeVisible()

      await expect(page.getByRole('heading', { name: emailFormTraduction.title })).toBeVisible()
      const emailArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: emailFormTraduction.title }) })
      await expect(emailArticle.getByLabel(emailFormTraduction.labels.currentEmail)).toBeVisible()
      await expect(emailArticle.getByLabel(emailFormTraduction.labels.currentEmail)).toBeDisabled()
      await expect(emailArticle.getByLabel(emailFormTraduction.labels.newEmail)).toBeVisible()
      await expect(emailArticle.getByLabel(emailFormTraduction.labels.currentPassword)).toBeVisible()
      await expect(emailArticle.getByRole('button', { name: emailFormTraduction.submitLabel })).toBeVisible()
   })

   test.describe('Profile form tests', () => {
      const { profileFormTraduction } = t

      test('Should full the formulary and get a error message', async ({ page }) => {

         const profileArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: profileFormTraduction.title }) })

         await profileArticle.getByLabel(profileFormTraduction.labels.name).fill('New name')
         await profileArticle.getByLabel(profileFormTraduction.labels.birthDate).fill('2020-02-02')
      

         await profileArticle.getByRole('button', { name: profileFormTraduction.submitLabel }).click()

         await expect(profileArticle.getByText('Warning')).toBeVisible()
         await expect(profileArticle.getByText('No older enough')).toBeVisible()
      })

      test('Should full the formulary and change the profile information correctly', async ({ page }) => {
         const profileArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: profileFormTraduction.title }) })

         await profileArticle.getByLabel(profileFormTraduction.labels.name).fill('New name')
         await profileArticle.getByLabel(profileFormTraduction.labels.birthDate).fill('1990-02-02')

         await profileArticle.getByRole('button', { name: profileFormTraduction.submitLabel }).click()

         await expect(profileArticle.getByText('Success')).toBeVisible()
         await expect(profileArticle.getByText('Change profile correctly')).toBeVisible()
      })
   })

   test.describe('Password form tests', () => {
      const { passwordFormTraduction } = t

      test('Should full the formulary and get a error message', async ({ page }) => {         
         const passwordArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: passwordFormTraduction.title }) })

         await passwordArticle.getByLabel(passwordFormTraduction.labels.currentPassword).fill('wrong')
         await passwordArticle.getByLabel(passwordFormTraduction.labels.newPassword).fill('1234')
         await passwordArticle.getByLabel(passwordFormTraduction.labels.repeatPassword).fill('1234')
      

         await passwordArticle.getByRole('button', { name: passwordFormTraduction.submitLabel }).click()

         await expect(passwordArticle.getByText('Warning')).toBeVisible()
         await expect(passwordArticle.getByText('Incorrect password')).toBeVisible()
      })

      test('Should full the formulary and change the password correctly', async ({ page }) => {
         const passwordArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: passwordFormTraduction.title }) })

         await passwordArticle.getByLabel(passwordFormTraduction.labels.currentPassword).fill('correct')
         await passwordArticle.getByLabel(passwordFormTraduction.labels.newPassword).fill('1234')
         await passwordArticle.getByLabel(passwordFormTraduction.labels.repeatPassword).fill('1234')

         await passwordArticle.getByRole('button', { name: passwordFormTraduction.submitLabel }).click()

         await expect(passwordArticle.getByText('Success')).toBeVisible()
         await expect(passwordArticle.getByText('Change password correctly')).toBeVisible()
      })
   })

   test.describe('Email form tests', () => {
      const { emailFormTraduction } = t

      test('Should full the formulary and get a error message', async ({ page }) => {         
         const emailArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: emailFormTraduction.title }) })

         await emailArticle.getByLabel(emailFormTraduction.labels.currentPassword).fill('wrong')
         await emailArticle.getByLabel(emailFormTraduction.labels.newEmail).fill('newemail@new.com')
      

         await emailArticle.getByRole('button', { name: emailFormTraduction.submitLabel }).click()

         await expect(emailArticle.getByText('Warning')).toBeVisible()
         await expect(emailArticle.getByText('Incorrect password')).toBeVisible()
      })
      
      test('Should full the formulary and change the email correctly', async ({ page }) => {         
         const emailArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: emailFormTraduction.title }) })

         await emailArticle.getByLabel(emailFormTraduction.labels.currentPassword).fill('correct')
         await emailArticle.getByLabel(emailFormTraduction.labels.newEmail).fill('newemail@new.com')
      

         await emailArticle.getByRole('button', { name: emailFormTraduction.submitLabel }).click()

         await expect(emailArticle.getByText('Success')).toBeVisible()
         await expect(emailArticle.getByText('Change email correctly')).toBeVisible()
      })
   })
})