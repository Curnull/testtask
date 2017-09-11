import {wrapInput} from '../../utils';
import {wrap} from '../../wrappers';
import {wrappers} from './domain';
import {Input} from '../../components';

export const UserNameInput = wrapInput(wrappers.form.userName, wrappers.validation).component(Input);
export const LoginPasswordInput = wrapInput(wrappers.form.password, wrappers.validation).component(Input);
