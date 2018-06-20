import { DatabaseHelper, RunOnPromise, HandleResult } from './database_helper';

export abstract class AbstractDatasource<T> {
    protected helper: DatabaseHelper

    constructor(protected tableName: string) {
        this.helper = new DatabaseHelper()
    }

    public abstract save(entity: T, runOnPromise: RunOnPromise<Boolean>)

    public abstract update(entity: T, runOnPromise: RunOnPromise<Boolean>)

    public abstract delete(entity: T, runOnPromise: RunOnPromise<Boolean>)

    public getAll(runOnPromise: RunOnPromise<Array<T>>) {
        const queryGetAll = "SELECT *FROM " + this.tableName
        this.fetchToList(queryGetAll, {}, runOnPromise)
    }

    protected abstract convertToArray(entity: T): Array<any>

    protected abstract fetchRow(item): T

    protected doManiPulate(query: string, params: any, runOnPromise: RunOnPromise<Boolean>) {
        var self = this
        this.helper.execute(query, params, {
            onSucceed(result) {
                console.log("Query result on manipulate : ", self.stringfy(result))
                runOnPromise.run(true)
            },

            onFailed(error) {
                runOnPromise.run(false)
                console.error("Couldn't manipulate data caused by : ", self.stringfy(error))
            }
        })
    }

    protected fetchToList(query: string, params: any, runOnPromise: RunOnPromise<Array<T>>) {
        const self = this
        self.execute(query, params, {
            onSucceed(result) {
                var entityList = self.collectAsList(result)
                runOnPromise.run(entityList)
                console.log("DATA : ", self.stringfy(entityList))
            },

            onFailed(error) {
                runOnPromise.run([])
                console.error("Couldn't fetch cause by : ", self.stringfy(error))
            }
        })
    }

    protected fetchSingle(query: string, params: any, runOnPromise: RunOnPromise<T>) {
        const self = this
        this.execute(query, params, {
            onSucceed(result) {
                const received = result.rows.length > 0
                console.log("Is receiving data ? ", received)

                var entity: T = undefined
                if (received) {
                    var item = result.rows.item(0)
                    console.log("Data : ", self.stringfy(item))
                    entity = self.fetchRow(item)
                }

                runOnPromise.run(entity)
            },

            onFailed(error) {
                console.error("Couldn't fetch data entity caused by : ", self.stringfy(error))
                runOnPromise.run(undefined)
            }
        })
    }

    private collectAsList(result): Array<T> {
        var entityList: Array<T> = []
        
        for (var i = 0; i < result.rows.length; i++) {
            var item = result.rows.item(i)
            var entity = this.fetchRow(item)

            entityList.push(entity)
        }
        console.log("Total data fetched : ", entityList.length)

        return entityList
    }

    private execute(query: string, params: any, handleResult: HandleResult) {
        this.helper.execute(query, params, handleResult)
    }

    protected stringfy(object): string {
        return JSON.stringify(object)
    }
}