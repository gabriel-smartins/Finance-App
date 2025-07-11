import { PostgresGetUserById } from '../repositories/postgres/index.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserById()

        const user = await getUserByIdRepository.execute(userId)

        return user
    }
}
