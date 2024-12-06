import { forwardRef } from 'react'
import InputMask from 'react-input-mask'

export const Input = forwardRef(({ className, type, placeholder, mask, ...props }, ref) => {
	return mask ? (
		<InputMask
			className={`${className} w-full h-12 border-solid border-[1px] border-zinc-500 rounded-lg pl-3 text-lg outline-none focus:outline-1 focus:outline-zinc-300 focus:outline focus:border-none`}
			mask={mask}
			placeholder={placeholder}
			type={type}
			ref={ref}
			{...props}
		/>
	) : (
		<input
			className={`${className} w-full h-12 border-solid border-[1px] border-zinc-500 rounded-lg pl-3 text-lg outline-none focus:outline-1 focus:outline-zinc-300 focus:outline focus:border-none`}
			type={type}
			placeholder={placeholder}
			ref={ref}
			{...props}
		/>
	)
})
