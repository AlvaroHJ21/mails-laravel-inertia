<?php

namespace App\Imports;

use App\Models\Perfilamiento;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;

class PerfilamientoImport implements ToModel
{

    use Importable;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        return new Perfilamiento([
            //
        ]);
    }

}
