import { useState, useEffect } from 'react'
import { TableRow } from './TableRow/TableRow'

export const TableBody = ({ userLogin }) => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		fetch('http://localhost:3000/api/clinic')
			.then(response => response.json())
			.then(table => setUsers(table.data))
	}, [])

	return (
		<>
			{userLogin && (
				<div className='absolute h-12 w-72 top-0 right-0 flex justify-center items-center text-lg bg-slate-300 text-zinc-800'>
					<span>{userLogin}</span>
				</div>
			)}
			<table className='h-full w-10/12 table-fixed border-collapse overflow-hidden border-2 border-slate-300 text-xl'>
				<thead className='bg-slate-300 text-zinc-800'>
					<tr>
						<th className='p-3 text-left'>Дата отправки</th>
						<th className='p-3 text-left'>ФИО</th>
						<th className='p-3 text-left'>Телефон</th>
						<th className='p-3 text-left'>Проблема</th>
					</tr>
				</thead>
				<tbody>
					{users.map(({ _id, dispatchDate, userName, phone, problem }) => (
						<TableRow
							key={_id}
							dispatchDate={dispatchDate}
							userName={userName}
							phone={phone}
							problem={problem}
						/>
					))}
				</tbody>
			</table>
		</>
	)
}
