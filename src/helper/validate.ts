import Validator from 'validatorjs';

const validator = async (
  body: any,
  rules: Validator.Rules,
  customMessages: Validator.ErrorMessages | undefined,
  callback: (arg0: Validator.Errors | null, arg1: boolean) => any
) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

export default validator;
