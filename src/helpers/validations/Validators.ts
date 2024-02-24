import Joi from 'joi'

class FormValidator {
    private validate(Schema: Joi.Schema, data: any) {
        const { error } = Schema.validate(data, { abortEarly: false })
        if (!error) return
        const errors: Form.ErrorInterface = {
            messages: error.details.map((err, key) => err.message),
            type: "danger"
        }
        return errors
    }
    async validateOption(data?: Form.FormDataInputOption) {
        const Schema = Joi.object({
            name: Joi.string()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.base': '{#key} must be a string.',
                    'any.required': '{#key} is required.'
                }),
            price: Joi.string()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.pattern.base': '{#key} must be a number. e.g. 20 or 20.00',
                    'string.base': '{#key} must be a string'
                }).when('.', {
                    is: Joi.valid(),
                    then: Joi.string()
                        .pattern(/^\d+(\.\d+)?$/)
                }),
            cost: Joi.string()
                .pattern(/^\d+$/)
                .required()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.pattern.base': '{#key} must be a valid number.',
                    'string.base': '{#key} must be a string',
                    'any.required': '{#key} is required.'
                }),
            stock: Joi.string()
                .pattern(/^\d+$/)
                .required()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.pattern.base': '{#key} must be a valid number.',
                    'string.base': '{#key} must be a string',
                    'any.required': '{#key} is required.'
                }),
        })
        const error = this.validate(Schema, data)
        return error
    }
    async validateFormCreate(data: Form.FormCreateArgs) {
        const Schema = Joi.object({
            name: Joi.string()
                .required()
                .messages({
                    'string.empty': '{#key} cannot be leave empty.',
                    'string.base': '{#key} must be a string.',
                    'any.required': '{#key} is required.'
                }),
            category: Joi.string()
                .required()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.base': '{#key} must be a string.',
                    'any.required': '{#key} is required.'
                }),
            price: Joi.string()
                .pattern(/^\d+(\.\d+)?$/)
                .required()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.pattern.base': '{#key} must be a number. e.g. 20 or 20.00',
                    'string.base': '{#key} must be a string',
                    'any.required': '{#key} is required.'
                }),
            cost: Joi.string()
                .pattern(/^\d+$/)
                .required()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.pattern.base': '{#key} must be a valid number.',
                    'string.base': '{#key} must be a string',
                    'any.required': '{#key} is required.'
                }),
            stock: Joi.string()
                .pattern(/^\d+$/)
                .required()
                .messages({
                    'string.empty': '{#key} cannot leave empty.',
                    'string.pattern.base': '{#key} must be a valid number.',
                    'string.base': '{#key} must be a string',
                    'any.required': '{#key} is required.'
                }),
            options: Joi.any()
                .when('.', {
                    is: Joi.valid(),
                    then: Joi.array()
                        .items(Joi.object({
                            name: Joi.string()
                                .messages({
                                    'string.empty': '{#key} cannot leave empty.',
                                    'string.base': '{#key} must be a string.',
                                    'any.required': '{#key} is required.'
                                }),
                            price: Joi.string()
                                .messages({
                                    'string.empty': '{#key} cannot leave empty.',
                                    'string.pattern.base': '{#key} must be a number. e.g. 20 or 20.00',
                                    'string.base': '{#key} must be a string'
                                }).when('.', {
                                    is: Joi.valid(),
                                    then: Joi.string()
                                        .pattern(/^\d+(\.\d+)?$/)
                                }),
                            cost: Joi.string()
                                .pattern(/^\d+$/)
                                .required()
                                .messages({
                                    'string.empty': '{#key} cannot leave empty.',
                                    'string.pattern.base': '{#key} must be a valid number.',
                                    'string.base': '{#key} must be a string',
                                    'any.required': '{#key} is required.'
                                }),
                            stock: Joi.string()
                                .pattern(/^\d+$/)
                                .required()
                                .messages({
                                    'string.empty': '{#key} cannot leave empty.',
                                    'string.pattern.base': '{#value} {#key} must be a valid number.',
                                    'string.base': '{#key} must be a string',
                                    'any.required': '{#key} is required.'
                                }),
                        })).required()
                        .messages({
                            'object.base': '{#key} must be an object',
                            'any.required': '{#key} is required.'
                        })
                })

        })
        const error = this.validate(Schema, data)
        return error
    }
}
const validator = new FormValidator()
export default validator