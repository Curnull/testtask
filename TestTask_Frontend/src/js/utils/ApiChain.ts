import {apiRoot, Api} from './';

export class ApiChain<TMethods> {
    public methods: TMethods;
    public api: Api;

    constructor({ url, methods }: { url: string, methods: TMethods}) {
        this.methods = methods;
        this.api = apiRoot.withUrl(url);
    }

    public withMethods<TNextMethods>(mapper: (methods: TMethods, api: Api) => TNextMethods) {
        return this.next<TNextMethods>({
            methods: mapper(this.methods, this.api)
        });
    }

    public next<TNextMethods = TMethods>({ methods = this.methods, url = this.api.url}: { methods?: TNextMethods, url?: string}):
    ApiChain<TNextMethods> {
        return new ApiChain<TNextMethods>({ methods, url } as any);
    }
}
