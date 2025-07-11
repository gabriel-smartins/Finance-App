import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError, ok, badRequest, notFound } from './helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpsRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
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
