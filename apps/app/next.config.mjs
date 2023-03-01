// @ts-check
import { env } from './src/env/server.mjs';
import WithPWA from 'next-pwa';
import WithBundleAnalyzer from '@next/bundle-analyzer';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const withBundleAnalyzer = WithBundleAnalyzer({
	enabled: env.ANALYZE === 'true',
});
const withPWA = WithPWA({
	disable: env.NODE_ENV === 'development',
	dest: 'public',
});

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	output: process.platform !== 'win32' ? 'standalone' : undefined,
	experimental: {
		outputFileTracingRoot: join(__dirname, '../../'),
	},
	i18n: {
		locales: ["en", "fr"],
		defaultLocale: "en",
	},
};
export default withBundleAnalyzer(withPWA(config));
