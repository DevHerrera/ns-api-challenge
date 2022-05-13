import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class DatabaseConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  /*
   * This is  a fuction to check if a variable is
   * present in the .env file
   * @return {string} Return a string
   */

  private getSetting(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Environment variables error - missing env.${key}`);
    }
    return value;
  }

  /*
   * This is  a fuction to check if
   * all needed variables are present
   * in the .env file
   */

  public checkSettings(keys: string[]) {
    keys.map((k: string) => {
      this.getSetting(k, true);
    });
  }

  public getPort() {
    return this.getSetting('PORT', true);
  }

  public isProduction() {
    const mode = this.getSetting('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getSetting('POSTGRES_HOST'),
      port: parseInt(this.getSetting('POSTGRES_PORT')),
      username: this.getSetting('POSTGRES_USER'),
      database: this.getSetting('POSTGRES_DATABASE'),
      password: this.getSetting('POSTGRES_PASSWORD'),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      //ssl: this.isProduction(),
    };
  }
}

const databaseConfigService = new DatabaseConfigService(process.env);
databaseConfigService.checkSettings([
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'POSTGRES_USER',
  'POSTGRES_PORT',
  'POSTGRES_HOST',
]);

export { databaseConfigService };
