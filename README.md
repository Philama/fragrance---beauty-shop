# Fragrance & Beauty Shop

Esta aplicación es una tienda moderna de fragancias y productos de belleza construida con React, Vite y Supabase.

## Ejecutar localmente

**Requisitos:** Node.js

1. Instala las dependencias:
   ```
   npm install
   ```
2. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```
   REACT_APP_SUPABASE_URL=tu_url_de_supabase
   REACT_APP_SUPABASE_ANON_KEY=tu_anon_key
   ```
3. Inicia la aplicación:
   ```
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

---

Ya no es necesario configurar Gemini API Key ni ninguna integración con Gemini/GoogleGenAI para la búsqueda. La búsqueda es completamente local.
