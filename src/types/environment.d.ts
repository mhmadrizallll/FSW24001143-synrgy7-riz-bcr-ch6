declare namespace NodeJS {
  interface ProcessEnv {
    SUPERADMIN_SECRET: string;
    ADMIN_SECRET: string;
    PORT?: string;
  }
}
