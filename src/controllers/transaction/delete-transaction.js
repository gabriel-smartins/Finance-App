import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    transactionIsNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(
                    httpRequest.params.transactionId
                )

            if (!deletedTransaction) {
                return transactionIsNotFoundResponse()
            }

            return ok(deletedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
