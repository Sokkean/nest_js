import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../module/users/user.entities';
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User], // add more entities if needed
  migrations: ['src/migrations/*.ts'], // ✅ point to migrations folder
  synchronize: false,
});