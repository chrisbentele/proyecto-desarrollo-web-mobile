import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5433),
  username: 'postgres',
  password: 'postgres',
  database: 'biblioteca',
  entities: [
    'dist/entity/**/*.js',
  ],
  synchronize: true,
  // migrations: [
  //   'dist/**/migrations/*{.ts,.js}',
  // ],
  migrationsRun: true,
  //   logging: process.env.ELECTRON_DEV ? 'all' : undefined,
  // logging: 'all',
}

export default config
