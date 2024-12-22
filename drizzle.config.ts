import { defineConfig } from 'drizzle-kit'
import env from './src/config/env'
export default defineConfig({
    // https://orm.drizzle.team/kit-docs/config-reference
    dialect: 'postgresql',
    schema: './src/schemas/schemas.ts',
    out: './src/schemas/migrations',
    // https://orm.drizzle.team/kit-docs/upgrade-21
    // driver: 'pg',
    dbCredentials: {
        url: env.POSTGRES_DB_URL as string,
    },
    verbose: true,
    strict: true,
    introspect: {
        casing: 'camel',
    },
})
