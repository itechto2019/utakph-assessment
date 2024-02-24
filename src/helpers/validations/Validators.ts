import Joi from 'joi'

class FormValidator {
    async validate(Schema: Joi.Schema, data: any) {
        const { error } = Schema.validate(data, { abortEarly: false })
        if (!error) return
        const errors: Form.ErrorInterface = {
            messages: error.details.map((err, key) => err.message),
            type: "danger"
        }
        return errors
    }
    async validateOption(data: string) {
        const Schema = Joi.string()
            .messages({
                'string.empty': 'option cannot leave empty.',
                'string.base': 'option must be a string.',
                'any.required': 'option is required.'
            })
        const error = this.validate(Schema, data)
        return error
    }
    async validateProductForm(data: Form.FormInputArgs) {
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
            price: Joi.number()
                .min(0)
                .required()
                .messages({
                    'number.min': '{#key} must be min of 0',
                    'number.base': '{#key} must be a number',
                    'any.required': '{#key} is required.'
                }),
            cost: Joi.number()
                .min(0)
                .required()
                .messages({
                    'number.min': '{#key} must be min of 0',
                    'number.base': '{#key} must be a number',
                    'any.required': '{#key} is required.'
                }),
            stock: Joi.number()
                .min(0)
                .integer()
                .required()
                .messages({
                    'number.base': '{#key} must be a number',
                    'number.integer': '{#key} cannot be a decimal value',
                    'any.required': '{#key} is required.'
                }),
            options: Joi.any()
                .when('.', {
                    is: Joi.valid(),
                    then: Joi.array()
                        .items(Joi.string()
                            .messages({
                                'string.empty': 'option cannot leave empty.',
                                'string.base': 'option must be a string.'
                            }))
                })

        })
        const error = this.validate(Schema, data)
        return error
    }
}
const validator = new FormValidator()
export default validator