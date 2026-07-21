import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_URL: z.url(),
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    OMSTORAGE_URL: z.url(),
    MEDIA_SERVICE_URL: z.url(),
    MEDIA_UPLOAD_SECRET: z.string(),
    MEDIA_UPLOAD_PROJECT_NAME: z.string(),

  },

  clientPrefix: 'VITE_',

  client: {
    VITE_APP_TITLE: z.string().min(1).optional(),
    VITE_OMSTORAGE_URL: z.url(),
    VITE_MEDIA_UPLOAD_PROJECT_NAME: z.string(),

  },

  runtimeEnv: import.meta.env,

  emptyStringAsUndefined: true,
})
