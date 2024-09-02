import { TypeOrmModuleOptions } from "@nestjs/typeorm"
export const TypeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{ .ts,.js }'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: false,
    logging: true
}