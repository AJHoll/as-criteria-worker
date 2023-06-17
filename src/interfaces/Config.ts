export interface ConfigDatabase {
  name: string,
  host: string,
  port: number,
  database: string;
}

export interface Config {
  databases: ConfigDatabase[];
}
