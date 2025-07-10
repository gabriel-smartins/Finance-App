import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //TO DO: verificar se o email já está em uso

        const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository

        const userWithProvidedEmail = postgresGetUserByEmailRepository.execute(
            createUserParams.email
        )

        if (userWithProvidedEmail) {
            throw new Error('The provide email is already in use.')
        }

        // gerar ID do usuário
        const userId = uuidv4()

        //criptografar senha
        const hashPassword = await bcrypt.hash(createUserParams.password, 10)

        //inserir usuário no banco
        const user = {
            ...createUserParams,
            id: userId,
            password: hashPassword,
        }

        // chamar repositorio
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
