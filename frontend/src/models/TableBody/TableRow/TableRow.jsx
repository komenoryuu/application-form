import { formatDate } from './utils'

export const TableRow = ({ dispatchDate, userName, phone, problem }) => (
	<tr className='text-xl even:bg-zinc-800'>
		<td className='p-3 text-left'>{formatDate(dispatchDate)}</td>
		<td className='p-3 text-left'>{userName}</td>
		<td className='p-3 text-left'>{phone}</td>
		<td className='p-3 text-left'>{problem}</td>
	</tr>
)
