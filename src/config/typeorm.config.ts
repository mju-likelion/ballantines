import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

type GenerateTypeOrmConfig = (env: NodeJS.ProcessEnv) => TypeOrmModuleOptions;

export const generateTypeOrmConfig: GenerateTypeOrmConfig = env => ({
  type: 'mysql',
  host: env.DATABASE_HOST,
  port: +env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  synchronize: env.NODE_ENV === 'development',
  autoLoadEntities: true,
});
