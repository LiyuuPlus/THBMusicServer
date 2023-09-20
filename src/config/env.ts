import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: ['.env.development.local', '.env.development'],
};
const init = ConfigModule.forRoot(configOptions);

export { init as configInit }