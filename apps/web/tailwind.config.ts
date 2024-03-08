import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import baseConfig from "@repo/shadcn/tailwind.config";

const config: Config = {
  content: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    ...baseConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shadcn/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [baseConfig],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  theme: { ...baseConfig.theme },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  plugins: [...baseConfig.plugins],
};
export default config;
