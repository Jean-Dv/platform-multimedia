/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly PLANS_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}