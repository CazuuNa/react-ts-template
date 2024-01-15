/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,tsx,ts,jsx}'],
	theme: {
		extend: {}
	},
	plugins: [],
	corePlugins: {
		preflight: false //禁用 Tailwind 的全局基本样式，
		//而不影响那些依靠添加自己的基本样式来正常工作的 utilities。
	}
}
