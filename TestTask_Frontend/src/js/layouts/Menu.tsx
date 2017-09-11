import * as React from 'react';
import cn from 'classnames';
import {wrap} from '../wrappers';
import {menuItems} from './';
import {routerExtender} from '../utils';
import {commonWrappers} from '../common';

export const MenuItem = ({onClick, text, isActive}) => {
    return  <li className={cn('nav-item', isActive && 'active')}><a className="nav-link" onClick={onClick}>{text}</a></li>;
};

export interface IProps {
    items: Array<{
        text: string,
        onClick: () => void,
        isActive: boolean,
    }>;
}

export class Menu extends React.PureComponent<IProps, {}> {
    public render() {
        return (
            <ul className="nav navbar-nav">
                {this.props.items.map((i, index) => <MenuItem key={index} {...i as any} />)}
            </ul>
        );
    }
}

export const Wrapped = wrap
    .extend(routerExtender)
    .withProps(({getProps}) => ({
        items: menuItems.filter((x) => x.isVisible()).map((x) => ({
            text: x.text,
            onClick: () => { getProps().history.push(x.href); },
            isActive: x.href === commonWrappers.pathName.state.value,
        }))
    }))
    .component(Menu);

export default Wrapped;
