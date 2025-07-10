import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        //TO DO: verificar se o email já está em uso

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
