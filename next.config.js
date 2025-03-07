const nextPwa = require("next-pwa")
const uriJs = require("uri-js")
const runtimeCache = require("./src/configurations/serviceWorkerRuntimeCache")

let commitHash, gitBranch

try {
  commitHash = require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString().trim() || "unknown"
  gitBranch = require("child_process")
    .execSync("git branch --show-current")
    .toString().trim()
} catch (e) {
  commitHash = "unknown"
  gitBranch = "unknown"
}

let versionString

try {
  const YAML = require("yaml")
  const fs = require("fs")
  const changelog = YAML.parse(fs.readFileSync("./changelog.yaml", "utf8"))

  const version = changelog.versions[0].version
  versionString = version.join(".")

  if (gitBranch !== "master") {
    versionString += `+${gitBranch}`
  }
} catch (e) {
  versionString = "unknown"
}

const withPWA = nextPwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: false,
  skipWaiting: true,
  runtimeCaching: runtimeCache
})

const nextConfig = {
  experimental:{
    isrMemoryCacheSize: 0,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080],
    domains: [process.env.THERESA_STATIC || "static.theresa.wiki"],
    imageSizes: [128, 256, 384],
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  generateBuildId: async () => {
    return commitHash
  },
  async rewrites() {
    return [
      {
        source: "/:server(CN|US|JP|TW|KR)/:path*",
        destination: "/:path*?server=:server"
      }
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.md$/i,
      loader: "raw-loader",
    })
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "yaml-loader"
    })
    return config
  },
  publicRuntimeConfig: {
    THERESA_WIKI_VERSION: versionString,
    GIT_COMMIT: commitHash,
    GTAG_ID: process.env.GTAG_ID,
    THERESA_STATIC: uriJs.parse(process.env.THERESA_STATIC || "https://static.theresa.wiki"),
    CRISP_WEBSITE_ID: process.env.CRISP_WEBSITE_ID,
  }
}

module.exports = withPWA(nextConfig)
