import { test,expect } from '@playwright/test'
import { Login } from '../../Page/Brands/login/login.page'
import { env } from 'process'


var email_address = env.email_address
var email_pwd = env.email_pwd

test('email login', async ({ page }) => {
    const login = new Login(page)
    await login.goToLoginPage()
    await login.emailLogin(email_address,email_pwd)
    await login.assertLoginSuccess()
})