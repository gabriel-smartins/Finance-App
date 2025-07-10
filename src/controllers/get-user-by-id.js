import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError, ok, badRequest, notFound } from './helpers.js'
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

            if (!user) {
                return notFound({ message: 'User not found' })
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
