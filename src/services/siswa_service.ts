import { RunOnPromise } from './database_helper';
import { Siswa } from './../models/siswa';
import { AbstractDatasource } from './abstract_datasource';

export class SiswaDatasource extends AbstractDatasource<Siswa>{

    constructor() {
        super("siswa")
    }

    public save(siswa: Siswa, runOnPromise: RunOnPromise<Boolean>) {
        const queryInsert = 'INSERT INTO ' + this.tableName +
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
        this.doManiPulate(queryInsert, parameters, runOnPromise)
    }

    public update(siswa: Siswa, runOnPromise: RunOnPromise<Boolean>) {
        const queryUpdate = 'UPDATE ' + this.tableName + ' SET ' +
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
        this.doManiPulate(queryUpdate, parameters, runOnPromise)
    }

    public delete(siswa: Siswa, runOnPromise: RunOnPromise<Boolean>) {
        const queryDelete = "DELETE FROM " + this.tableName +
            ' WHERE _id=?'
        var params = [siswa.id]

        this.doManiPulate(queryDelete, params, runOnPromise)
    }

    public findById(id: number, runOnPromise: RunOnPromise<Siswa>) {
        const queryFindById = "SELECT * FROM " + this.tableName +
            " WHERE _id=?"

        this.fetchSingle(queryFindById, [id], runOnPromise)
    }

    public findsByName(nama: string, runOnPromise: RunOnPromise<Array<Siswa>>) {
        const queryFindByName = "SELECT *FROM " + this.tableName +
            " WHERE nama_depan LIKE ? OR nama_belakang LIKE ?"
        var params = ["%" + nama + "%", "%" + nama + "%"]

        this.fetchToList(queryFindByName, params, runOnPromise)
    }

    protected fetchRow(item): Siswa {
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

    protected convertToArray(siswa: Siswa): Array<any> {
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
}
