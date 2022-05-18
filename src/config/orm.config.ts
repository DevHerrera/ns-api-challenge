require('dotenv').config();

const getSetting = (settingName: string): string => {
  return process.env[settingName];
};

export default {
  type: 'postgres',
  synchronize: false,
  host: getSetting('POSTGRES_HOST'),
  port: parseInt(getSetting('POSTGRES_PORT')),
  username: getSetting('POSTGRES_USER'),
  database: getSetting('POSTGRES_DATABASE'),
  password: getSetting('POSTGRES_PASSWORD'),

  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: false,
  // These two lines have been added:
  seeds: ['src/db/seeding/seeds/**/*{.ts,.js}'],
  factories: ['src/db/seeding/factories/**/*{.ts,.js}'],
};
