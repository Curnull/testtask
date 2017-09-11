import {wrapInput} from '../../utils';
import {wrap} from '../../wrappers';
import {wrappers} from './domain';
import {Input, TextArea} from '../../components';

export const TitleInput = wrapInput(wrappers.article.title, wrappers.validation).component(Input);
export const ContentTextArea = wrapInput(wrappers.article.content, wrappers.validation).component(TextArea);
