// import { neon } from '@neondatabase/serverless'

export default function page() {
	// async function create(formData: FormData) {
	// 	'use server'
	// 	// Connect to the Neon database
	// 	const sql = neon(`${process.env.DATABASE_URL}`)
	// 	const comment = formData.get('comment')
	// 	// Insert the comment from the form into the Postgres database
	// 	await sql('INSERT INTO comments (comment) VALUES ($1)', [comment])
	// }


	return (
		<div>
			{/* <form action={create}>
				<input
					type="text"
					placeholder="write a comment"
					name="comment"
				/>
				<button type="submit">Submit</button>
			</form> */}
			<div className='text-center bg-orange-400'>Welcome to DOCS PAGE. Data will be fetched here and used later.</div>
		</div>
	)
}
