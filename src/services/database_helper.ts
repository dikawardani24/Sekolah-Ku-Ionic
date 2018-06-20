import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

function stringfy(object) {
    return JSON.stringify(object)
}

export interface RunOnPromise<T> {
    run(data: T)
}

export interface HandleResult {
    onSucceed(result)

    onFailed(error)
}

export class DatabaseHelper {
    private storage: SQLite

    constructor() {
        this.storage = new SQLite()
    }

    public execute(query: string, params: any, handleResult: HandleResult) {
        this.storage.create({
            name: 'sekolah_ku.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql(query, params).then((result) => {
                handleResult.onSucceed(result)
            }, (error) => {
                handleResult.onFailed(error)
                console.error("Couldn't execute query : " + query + " cause by : ", stringfy(error))
            })

        }, (error) => {
            handleResult.onFailed(error)
            console.error("Couldn't open database : ", stringfy(error))
        })
    }

    public createTables(runOnPromise: RunOnPromise<Boolean>) {
        const queryCreateTableSiswa = 'CREATE TABLE IF NOT EXISTS siswa(' +
            '_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'nama_depan TEXT, ' +
            'nama_belakang TEXT, ' +
            'no_hp TEXT, ' +
            'email TEXT, ' +
            'tgl_lahir TEXT, ' +
            'jenjang TEXT, ' +
            'gender TEXT, ' +
            'hobi TEXT, ' +
            'alamat TEXT)'

        this.execute(queryCreateTableSiswa, {}, {
            onSucceed(result) {
                console.log("Table siswa is created : ", stringfy(result))
                runOnPromise.run(true)
            }, 

            onFailed(error) {
                runOnPromise.run(false)
                console.error("Couldn't create table siswa")
            }
        })
    }
}

