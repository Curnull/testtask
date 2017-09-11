import * as React from 'react';

export default class NotAuthorized extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className="mt-5">
                <h2>You are not authorized to view this page</h2>
            </div>
        );
    }
}
