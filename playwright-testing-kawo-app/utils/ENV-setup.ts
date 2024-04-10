import { type FullConfig } from "@playwright/test";
import dotenv from "dotenv";
/**
 * 由于每个环境的URL不一样，参数化环境URL(envfile)后并在package.json文件配置，通过运行不同命令来执行目标URL
 * 在playwright.config.ts文件中配置-->baseURL: process.env.BASE_URL
 * @param config 
 */
async function globalSetup(config: FullConfig) {
    if (process.env.test_env) {
        dotenv.config({
            path: `./envfile/.env.${process.env.test_env}`,
            override: true    
        })
    }
}
export default globalSetup;