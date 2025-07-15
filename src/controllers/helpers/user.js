import { badRequest, notFound } from './http.js'
import validator from 'validator'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    })

export const invalidEmailResponse = () =>
    badRequest({
        message: 'Invalid e-mail.Please provided a valid one.',
    })

export const userNotFoundResponse = (id) =>
    notFound({ message: 'User not found' })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

