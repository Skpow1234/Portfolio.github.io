export const repositoryCopyEs: Record<string, { description: string; impact: string }> = {
  "Sip-Happens": {
    description:
      "Tienda de cerveza para Colombia que se usa desde la terminal: entras por SSH a una interfaz de texto, armas el carrito y pagas fuera de la terminal.",
    impact:
      "API en Go con PostgreSQL, pagos alojados en Stripe (sin datos de tarjeta en SSH), reservas de inventario y operación solo con Docker.",
  },
  "Squad-Finder": {
    description:
      "Plataforma para que jugadores encuentren equipo según el juego, el rango, la región, el idioma, el horario, el rol y el estilo de juego.",
    impact:
      "Next.js y FastAPI, con PostgreSQL, Redis, tiempo real con Socket.IO, autenticación JWT y una API local en Docker.",
  },
  Kurae: {
    description:
      "Comercio social para lanzamientos limitados, listas de espera, checkout, topes de inventario, referidos y analítica de campañas.",
    impact:
      "Tienda en Next.js con API en Go, workers en Redis, pagos con varios proveedores y un BFF respaldado por OpenAPI.",
  },
  "LP-climb": {
    description:
      "Visualizaciones de subida de rango, inspiradas en League, a partir de las contribuciones de GitHub: tarjetas de tier y escaleras animadas en SVG, PNG, WebP y GIF.",
    impact:
      "API de render alojada, una GitHub Action para el README del perfil, temas, escaleras 1v1 y de equipo, y documentación OpenAPI.",
  },
  "Shinrai-Trade": {
    description:
      "Espacio de trabajo en Rust para una plataforma de trading: primero la corrección del dominio, luego datos de mercado y órdenes de prueba autenticadas. No es un exchange y no custodia fondos.",
    impact:
      "Gateways con Tokio y Axum, dinero en enteros (sin flotantes), libro de doble entrada, riesgo previo a la orden, almacenamiento en Postgres y CI multiplataforma.",
  },
  TheWindowsTunning: {
    description:
      "WinTune, un diagnóstico nativo de rendimiento en Windows: mide cuellos de botella, explica el impacto y aplica correcciones seguras y reversibles por CLI o TUI.",
    impact:
      "C17 con CMake/MSVC, APIs oficiales de Windows, diario de reversión, lanzador en la bandeja, JSON compatible con OpenSSH y binarios portátiles.",
  },
  Katame: {
    description:
      "CLI y SDK multiplataforma que cifra, calcula hashes y firma artefactos en paquetes portátiles .katame.",
    impact:
      "Cifrado AEAD, KEM post-cuánticos, envoltorio KMS, firma con Sigstore, políticas y auditoría, más bindings en Go, Python y TypeScript.",
  },
  Tokiwa: {
    description:
      "Esqueleto de cliente blockchain en C++20: modelos, criptografía, serialización y P2P, con scaffolding Docker/Helm para un nodo completo y un explorador.",
    impact:
      "Build con CMake y Conan, RocksDB, Postgres, Redis, Prometheus, Grafana y Jaeger para la infra local.",
  },
  Rengo: {
    description:
      "Base de datos distribuida en Rust con transacciones ACID, SQL, consenso Raft y particionado; pensada para usarse por CLI y empaquetada para la nube.",
    impact:
      "Crates de core, config y storage; backends enchufables; perfiles de Docker Compose y documentación de despliegue.",
  },
  Shugo: {
    description:
      "Almacenamiento de archivos P2P cifrado en Go: blobs con dirección por contenido sobre TCP y AES-GCM.",
    impact:
      "Transporte P2P, almacén content-addressable en disco, handshake HMAC entre pares, y APIs REST, GraphQL y gRPC.",
  },
  "Streamlens-backend": {
    description: "API backend para analítica de streaming en tiempo real.",
    impact: "Servicios en Python para ingesta de datos en vivo y cargas de analítica.",
  },
};
