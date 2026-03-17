/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly MY_EMAIL_ADDRESS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
