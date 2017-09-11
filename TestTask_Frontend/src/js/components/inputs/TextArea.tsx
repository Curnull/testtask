import * as React from 'react';
import cn from 'classnames';

export interface IProps {
    disabled?: boolean;
    onChange: (val: string) => void;
    value: any;
    id?: string;
    placeholder?: string;
    className?: string;
    error?: string;
}

export default class TextArea extends React.PureComponent<IProps, {}> {
    public static defaultProps = {
        onChange: () => {},
        type: 'text',
        value: '',
    };

    public onChange = (e) => {
        this.props.onChange!(e.target.value);
    }
    public render() {
        const {error, ...props} = this.props;
        const valid = !error;
        return (
            <div className={cn('form-group')}>
                <textarea {...props as any} onChange={this.onChange} className={cn('form-control', !valid && 'is-invalid', props.className)} />
                {!valid && <div className="invalid-feedback">{error}</div>}
            </div>
        );
    }
}
