import {wrapInput} from '../../utils';
import {wrap} from '../../wrappers';
import {wrappers} from './domain';
import {Input} from '../../components';

export const SignUpLoginInput = wrapInput(wrappers.form.userName, wrappers.validation).component(Input);
export const SignUpEmailInput = wrapInput(wrappers.form.email, wrappers.validation).component(Input);
export const SignUpPasswordInput = wrapInput(wrappers.form.password, wrappers.validation).component(Input);
export const SignUpConfirmPasswordInput = wrapInput(wrappers.form.confirmPassword, wrappers.validation).component(Input);
