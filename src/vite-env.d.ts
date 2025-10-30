/// <reference types="vite/client" />

// Declare module types for image files
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.JPG' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly MODE: string
  readonly BASE_URL: string
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}