import PostgresHelper from '../../db/postgres/helper.js'

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const results = await PostgresHelper.query(
            'INSERT INTO users (ID, first_name, last_name,  email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUserParams.ID,
                createUserParams.name,
                createUserParams.email,
                createUserParams.password,
            ]
        )

        return results[0]
    }
}
