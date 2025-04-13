import type { TransitionAnimation } from 'astro'

const anim: {
	old: TransitionAnimation
	new: TransitionAnimation
} = {
	old: {
		name: 'move-in',
		duration: '0.2s',
		easing: 'linear',
	},
	new: {
		name: 'move-out',
		duration: '0.2s',
		easing: 'linear',
	},
}

export const IMAGE_ANIMATION = Object.freeze({
	forwards: anim,
	backwards: anim,
})
