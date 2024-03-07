<?php

namespace App\Imports;

use App\Models\Perfil;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;

class PerfilImport implements ToModel
{

    use Importable;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        return new Perfil([
            //
        ]);
    }

}
