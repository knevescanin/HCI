declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        DATABASE_URL_UNPOOLED: string;
        PGHOST: string;
        PGHOST_UNPOOLED: string;
        PGUSER: string;
        PGDATABASE: string;
        PGPASSWORD: string;
        POSTGRES_URL: string;
        POSTGRES_URL_NON_POOLING: string;
        POSTGRES_USER: string;
        POSTGRES_HOST: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DATABASE: string;
        POSTGRES_URL_NO_SSL: string;
        POSTGRES_PRISMA_URL: string;
        CONTENTFUL_SPACE_ID: string;
        CONTENTFUL_ACCESS_TOKEN: string;
        CONTENTFUL_MANAGEMENT_API_TOKEN: string;
        CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
        CONTENTFUL_ENVIRONMENT: string;
        NEXT_PUBLIC_API_URL_DEV: string;
        NEXT_PUBLIC_API_URL_PROD: string;
        IS_PROD: boolean;
    }
}