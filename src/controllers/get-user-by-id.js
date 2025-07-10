import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { created, serverError, ok, badRequest } from './helpers.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(httpsRequest) {
        try {
            const isIdValid = validator.isUUID(httpsRequest.params.userId)

            if (!isIdValid) {
                return badRequest({ message: 'The provide ID is not valid' })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpsRequest.params.userId
            )

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
