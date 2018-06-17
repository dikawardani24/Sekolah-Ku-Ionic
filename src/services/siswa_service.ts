import { RunOnPromise } from './siswa_service';
import { Siswa } from './../models/siswa';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class DatabaseHelper {
    public createTables() {
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

        this.open().then((db: SQLiteObject) => {
            db.executeSql(queryCreateTableSiswa, {})
                .then((result) => {
                    console.log("Table Created: ", this.stringfy(result))
                }, (error) => {
                    console.error("Unable to execute sql", this.stringfy(error))
                })

        }, (error) => {
            console.error("Unable to open database", this.stringfy(error))
        })
    }

    public open(): Promise<SQLiteObject> {
        let sqlite = new SQLite()
        return sqlite.create({
            name: 'sekolah_ku.db',
            location: 'default'
        })
    }

    public stringfy(object): string {
        return JSON.stringify(object)
    }
}

export class SiswaDatasource {
    private TABLE_NAME = 'siswa'
    private helper: DatabaseHelper

    constructor() {
        this.helper = new DatabaseHelper()
    }

    private open(): Promise<SQLiteObject> {
        return this.helper.open()
    }

    public save(siswa: Siswa) {
        this.open().then((db: SQLiteObject) => {
            const queryInsert = 'INSERT INTO ' + this.TABLE_NAME +
                '(nama_depan, ' +
                'nama_belakang, ' +
                'no_hp, ' +
                'email, ' +
                'tgl_lahir, ' +
                'jenjang, ' +
                'gender, ' +
                'hobi, ' +
                'alamat) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'

            const parameters = this.convertToArray(siswa)
            db.executeSql(queryInsert, parameters)
                .then((result) => {
                    console.log("Data siswa is inserted : ", this.stringFy(result))
                }, (error) => {
                    console.error("Couldn't save data siswa : ", this.stringFy(error))
                })
        }, (error) => {
            console.error("Couldn't open database : ", JSON.stringify(error))
        })
    }

    public update(siswa: Siswa) {
        this.open().then((db: SQLiteObject) => {
            const queryUpdate = 'UPDATE ' + this.TABLE_NAME + ' SET ' +
                'nama_depan=?, ' +
                'nama_belakang=?, ' +
                'no_hp=?, ' +
                'email=?, ' +
                'tgl_lahir=?, ' +
                'jenjang=?, ' +
                'gender=?, ' +
                'hobi=?, ' +
                'alamat=? WHERE _id=?'
            const parameters = this.convertToArray(siswa)
            parameters.push(siswa.id)

            db.executeSql(queryUpdate, parameters).then((result) => {
                console.log("Data siswa is updated : ", this.stringFy(result))
            }, (error) => {
                console.error("Couldn't update data siswa : ", this.stringFy(error))
            })
        }, (error) => {
            console.error("Couldn't open database : ", JSON.stringify(error))
        })
    }

    public delete(siswa: Siswa) {
        this.open().then((db: SQLiteObject) => {
            const queryDelete = "DELETE FROM " + this.TABLE_NAME +
                ' WHERE _id=?'
            db.executeSql(queryDelete, [siswa.id]).then((result) => {
                console.log("Data siswa is deleted : ", this.stringFy(result))
            }, (error) => {
                console.error("Couldn't delete data siswa : ", this.stringFy(error))
            })
        }, (error) => {
            console.error("Couldn't open database : ", JSON.stringify(error))
        })
    }

    public findBy(id: number): Siswa {
        var siswa: Siswa = undefined

        this.open().then((db: SQLiteObject) => {
            const queryFindById = "SELECT * FROM " + this.TABLE_NAME +
                " WHERE _id=?"
            db.executeSql(queryFindById, [id]).then(result => {
                const received = result.rows.length > 0
                console.log("Is receiving data ? ", received)
                if(received) {
                    var item = result.rows.item(0)
                    console.log("Data : ", this.stringFy(item))
                    siswa =  this.fetchRow(item)
                }
            }, (error) => {
                console.error("Couldnt fetch data by id : ", this.stringFy(error))
            })
        }, (error) => {
            console.error("Couldn't open database : ", this.stringFy(error))
        })
        return siswa
    }

    public getAll(runOnPromise: RunOnPromise<Array<Siswa>>) {
        this.open().then((db: SQLiteObject) => {
            const queryGetAll = "SELECT *FROM " + this.TABLE_NAME
            db.executeSql(queryGetAll, {}).then(res => {
                var totalFetcthData = res.rows.length
                console.log("Total fetcthed data : ", totalFetcthData)

                var siswaList = []
                for (var i = 0; i < res.rows.length; i++) {
                    var item = res.rows.item(i)
                    var siswa = this.fetchRow(item)

                    siswaList.push(siswa)
                }
                console.log("Total data converted : ", siswaList.length)
                runOnPromise.run(siswaList)
            }, (error) => {
                console.error("Couldn't load data siswa : ", this.stringFy(error))
            })
        }, (error) => {
            console.error("Couldn't open database : ", this.stringFy(error))
        })
    }

    private fetchRow(item): Siswa {
        var siswa = new Siswa()

        siswa.id = item._id
        siswa.namaDepan = item.nama_depan
        siswa.namaBelakang = item.nama_belakang
        siswa.noHp = item.no_hp
        siswa.email = item.email
        siswa.tglLahir = item.tgl_lahir
        siswa.jenjang = item.jenjang
        siswa.gender = item.gender
        siswa.hobi = item.hobi
        siswa.alamat = item.alamat

        return siswa
    }

    private convertToArray(siswa: Siswa): Array<any> {
        return [
            siswa.namaDepan,
            siswa.namaBelakang,
            siswa.noHp,
            siswa.email,
            siswa.tglLahir,
            siswa.jenjang,
            siswa.gender,
            siswa.hobi,
            siswa.alamat
        ]
    }

    private stringFy(object): string {
        return this.helper.stringfy(object)
    }
}

export interface RunOnPromise<T> {
    run(data: T)
}