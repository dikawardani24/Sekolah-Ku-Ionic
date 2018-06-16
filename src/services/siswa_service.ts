import { Siswa } from './../models/siswa';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class SiswaDatasource {
    private TABLE_NAME = 'siswa'

    constructor(private sqlite: SQLite) {
        this.prepare()
    }

    private open(): Promise<SQLiteObject> {
        return this.sqlite.create({
            name: 'sekolah_ku.db',
            location: 'default'
        })
    }

    private prepare() {
        const queryCreateTableSiswa = 'CREATE TABLE IF NOT EXISTS ' + this.TABLE_NAME + '(' +
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
                .then(result => console.log("TABLE CREATED"))
        })
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
                'hobi=?, '+
                'alamat=? WHERE _id=?'
            const parameters = this.convertToArray(siswa)
            parameters.push(siswa.id)

            db.executeSql(queryUpdate, parameters)
        })
    }

    public delete(siswa: Siswa) {
        this.open().then((db: SQLiteObject) => {
            const queryDelete = "DELETE FROM " + this.TABLE_NAME +
                ' WHERE _id=?'
            db.executeSql(queryDelete, [siswa.id])
        })
    }

    public getAll(): Array<Siswa> {
        var siswaList = []
        this.open().then((db: SQLiteObject) => {
            const queryGetAll = 'SELECT * FROM ' + this.TABLE_NAME
            db.executeSql(queryGetAll, {})
                .then(result => {
                    for (var i = 0; i < result.rows.length; i++) {
                        var item = result.rows.item[i]
                        var siswa = this.fetchRow(item)
                        siswaList.push(siswa)
                    }
                })
        })
        return siswaList
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
}