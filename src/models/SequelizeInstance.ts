export interface SequelizeInstance {
    port: string;
    host: string;
    username: string;
    password: string; 
    database: string;
    schema: string;
    certificatesRequired?: boolean;
    certificateLocation?: string;
}
