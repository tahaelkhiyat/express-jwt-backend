import * as joi from 'joi'

export const validateJoiSchema = async (schema: joi.Schema, values: any) => {
    let errors = []
    let validationResult: joi.ValidationResult

    validationResult = schema.validate(values, {abortEarly: false})
    if(validationResult.error) {
        validationResult.error.details.forEach(err => {
            errors.push(err.message)
        })
    }

    return errors
}