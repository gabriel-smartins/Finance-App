import validator from 'validator'
import { badRequest } from './http'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provide ID is not valid',
    })
