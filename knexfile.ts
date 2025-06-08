import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

  const databaseUrl = process.env.DATABASE_URL


const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './lib/db/migrations'
    },
    seeds: {
      directory: './lib/db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './lib/db/migrations'
    },
    seeds: {
      directory: './lib/db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './lib/db/migrations'
    },
    seeds: {
      directory: './lib/db/seeds'
    }
  }
};

export default config; 