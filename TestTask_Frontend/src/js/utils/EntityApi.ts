import {ApiChain } from './';

export interface IServerResponse<T> {
    status: string;
    data: T;
    errorMessages: string[];
}

export interface IEntity {
    id: number;
}
export const deaultEntityMapper = (e) => e;

export function entityApi<TEntity extends IEntity>(url: string, mapper: (entity: TEntity) =>  any = deaultEntityMapper) {
    return new ApiChain({ url, methods: {}}).withMethods((methods, api) => {
        const checkResp = (r: any) => {
            if (r.errorDetails) {
                alert(r.errorDetails.title);
                throw new Error(JSON.stringify(r.errorDetails));
            }
        };

        const saveMany = (entities: TEntity[]): Promise<TEntity[]> => {
            const promises: Array<Promise<any>> = [];
            entities.forEach((entity) => {
                const dataToSend = mapper(entity);
                if (entity.id === 0) {
                    promises.push(api.post<TEntity>('', dataToSend)
                        .then((r) => {
                            checkResp(r);
                            return r;
                        }));
                } else {
                    promises.push(api.put<TEntity>('', dataToSend).then((r) => {
                        checkResp(r);
                        return r;
                    }));
                }
            });
            return Promise.all(promises);
        };

        const save = (entity: TEntity): Promise<TEntity> =>  {
            return saveMany([entity]).then((resps) => resps[0]);
        };

        const remove = (id: number): Promise<any> => {
            return removeMany([id]).then((responses) => responses[0]);
        };

        const removeMany = (ids: number[]): Promise<any[]> => {
            const promises: Array<Promise<any>> = [];
            ids.forEach((id) => {
                promises.push(api.delete(id));
            });
            return Promise.all(promises);
        };

        const get = (id: number): Promise<TEntity> => {
            return api.get<TEntity>(id);
        };

        return {
            saveMany,
            save,
            remove,
            removeMany,
            get,
            checkResp,
        };
    });
}
