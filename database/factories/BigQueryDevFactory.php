<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BigQueryTest>
 */
class BigQueryDevFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //8 digitos como dni unico
            "DOCUMENTO" => $this->faker->unique()->numberBetween(10000000, 99999999),
            //fecha de nacimiento en formato YYYY-MM-DD
            "FH_NACIMIENTO" => $this->faker->date(),
            //entre masculino y femenino
            "SEXO" => $this->faker->randomElement(["Masculino", "Femenino"]),
            //entre Casado, Soltero, Viudo, Divorciado
            "ESTADO_CIVIL" => $this->faker->randomElement(["Casado", "Soltero", "Viudo", "Divorciado"]),
            //numero random de 6 digitos
            "UBIGEO" => $this->faker->randomNumber(6),
            //entre Lima, Arequipa, Cusco, Puno
            "DEPARTAMENTO" => $this->faker->randomElement(["Lima", "Arequipa", "Cusco", "Puno"]),
            //entre Lima, callao, Huarochiri, Yauyos
            "PROVINCIA" => $this->faker->randomElement(["Lima", "Callao", "Huarochiri", "Yauyos"]),
            //entre Lima, Callao, Chosica, San Bartolo
            "DISTRITO" => $this->faker->randomElement(["Lima", "Callao", "Chosica", "San Bartolo"]),
        ];
    }
}
