// const path = require('path');
const withPWA = require('next-pwa');
// const withPWA = require("@imbios/next-pwa")({
//   dest: "public"
// })

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
}

// module.exports = nextConfig;
module.exports = withPWA({
  dest: 'public'
})(nextConfig);

// const withPWA = withPWAInit({
//   dest: 'public',
//   buildExcludes: ["app-build-manifest.json"]
// });

// const generateAppDirEntry = (entry) => {
//   const packagePath = require.resolve('next-pwa');
//   const packageDirectory = path.dirname(packagePath);
//   const registerJS = path.join(packageDirectory, "register.js")

//   return entry().then((entries) => {
//     if (entries["main-app"] && !entries["main-app"].includes(registerJS)) {
//       if (Array.isArray(entries["main-app"])) {
//         entries["main-app"].unshift(registerJS);
//       } else if (typeof entries["main-app"] === "string") {
//         entries["main-app"] = [registerJS, entries["main-app"]];
//       }
//     }
//     return entries;
//   })
// }

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   reactStrictMode: false,
//   // webpack: (config) => {
//   //   config.externals.push({
//   //     'utf-8-validate': 'utf-8-validate',
//   //     'bufferutil': 'bufferutil',
//   //   })

//   //   return config
//   // }
//   webpack: (config) => {
//     const entry = generateAppDirEntry(config.entry);
//     config.entry = () => entry;

//     return config;
//   }
// };

// module.exports = withPWA(nextConfig);