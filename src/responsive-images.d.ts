// `?imgSizes=…&enhanced` asks @sveltejs/enhanced-img for a full set of widths (540–2560px)
// instead of just 1x/2x. Use it for images chosen at runtime (`<enhanced:img src={picture}>`)
// that are shown large, so the browser can pick a sharp one from the `sizes` attribute.
declare module '*&enhanced' {
	import type { Picture } from '@sveltejs/enhanced-img';
	const value: Picture;
	export default value;
}
