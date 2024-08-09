import { Module} from "@nestjs/common";


import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { Users } from "@app/common";
import { Project } from "@app/common";
import { AuthModule } from './auth/auth.module';
import { Task, Tasklist } from "@app/common";



@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),        
        TypeOrmModule.forRoot({            
                type: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                entities: [Users, Project, Tasklist, Task],  
                synchronize: Boolean(process.env.POSTGRES_DATABASE_SYNC),              
                autoLoadEntities: true,            
        }),
        UsersModule,
        AuthModule,        
    ]
})

export class AppModule {}
