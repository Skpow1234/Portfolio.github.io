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
  Vaultpack: {
    description: "CLI de cifrado multiplataforma que empaqueta datos en archivos portátiles .vpack.",
    impact: "Modos post-cuánticos, integración con KMS, firma con Sigstore y compilaciones para varias plataformas.",
  },
  ChainForge: {
    description: "Esqueleto de cliente blockchain en C++20/23.",
    impact: "Arquitectura con RocksDB, PostgreSQL, Redis, Prometheus y preparación para Kubernetes.",
  },
  ShardForge: {
    description: "Base de datos distribuida en Rust con transacciones ACID y compatibilidad SQL.",
    impact: "Consenso RAFT, particionado y un diseño pensado para escalar en horizontal.",
  },
  PeerVault: {
    description: "Compartición de archivos entre pares, con cifrado de extremo a extremo.",
    impact: "Almacenamiento P2P en Go, centrado en privacidad y transferencias cifradas.",
  },
  "Streamlens-backend": {
    description: "API backend para analítica de streaming en tiempo real.",
    impact: "Servicios en Python para ingesta de datos en vivo y cargas de analítica.",
  },
};
