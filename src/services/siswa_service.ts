import { Siswa } from '../models/siswa';
export class DatabaseHelper {
    
}

export class SiswaDatasource {
    private open() {

    }

    private close() {

    }

    public simpan(siswa: Siswa) {
        this.open()

        this.close()
    }

    public update(siswa: Siswa) {
        this.open()

        this.close()
    }

    public delete(siswa: Siswa) {
        this.open()

        this.close()
    }

    public getAll(): Array<Siswa> {
        this.open()

        this.close()
        return []
    }
}