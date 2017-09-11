import * as React from 'react';
import domain, { wrappers } from './domain';
import {wrap} from '../../wrappers';
import {ArticleListItem, ArticlesContainer} from '../../components';
import {IArticleListItem} from '../../interfaces';
import {
    ContentTextArea, TitleInput
} from './';
import {routerExtender} from '../../utils';
import {PATHS} from '../../routes';

export interface IProps {
    isLoading: boolean;
    isNew: boolean;
    publish: () => void;
    save: () => void;
    published: boolean;
    back: () => void;
    isValid: boolean;
}

export class EditArticle extends React.PureComponent<IProps, {}> {
    public render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="card col-md-12">
                    <div className="card-body">
                    <form>
                        <fieldset>
                            <legend>{`${this.props.isNew ? 'Create' : 'Edit'} Article`}</legend>
                            <div className="form-group">
                                <label htmlFor="userName">Title *</label>
                                <TitleInput disabled={this.props.isLoading} id="userName" placeholder="Enter title..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content *</label>
                                <ContentTextArea disabled={this.props.isLoading} id="content" placeholder="Enter content..." />
                            </div>
                            <button type="button" disabled={this.props.isLoading} className="btn" onClick={this.props.back}>
                                    Back
                            </button>
                            <div className="pull-right">
                                <button type="button" disabled={this.props.isLoading || !this.props.isValid} className="btn btn-success" onClick={this.props.save}>
                                    {this.props.isNew ? 'Create' : 'Save'}
                                </button>
                                &nbsp;&nbsp;
                                {   !this.props.published &&
                                    <button type="button" disabled={this.props.isLoading || !this.props.isValid} className="btn btn-primary" onClick={this.props.publish}>
                                        {this.props.isNew ? 'Create and Publish' : 'Publish'}
                                    </button>
                                }
                            </div>
                        </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const requests = wrappers.requests;
export const Wrapped = wrap
    .extend(domain)
    .extend(routerExtender)
    .withProps(() => ({
        isNew: !wrappers.article.id.state.value,
        isLoading: !!Object.keys(requests).find((key) => requests[key].sending),
        published: wrappers.article.isPublic.state.value,
        isValid: wrappers.validation.methods.isValid(),
    }))
    .withProps(({getProps}) => ({
        publish: () => {
            if (wrappers.article.id.state.value) {
                requests.publish.methods.send();
            } else {
                if (!wrappers.validation.methods.validateAll()) {
                    return;
                }
                requests.save.methods.send().then(() => {
                    requests.publish.methods.send().then(() => getProps().history.push(PATHS.MY_ARTICLES));
                });
            }
        },
        save: () => {
            if (!wrappers.validation.methods.validateAll()) {
                return;
            }
            requests.save.methods.send().then(() => getProps().history.push(PATHS.MY_ARTICLES));
        },
        back: () => {
            getProps().history.push(PATHS.MY_ARTICLES);
        }
    }))
    .component(EditArticle);

export default Wrapped;
