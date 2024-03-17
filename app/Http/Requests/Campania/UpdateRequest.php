<?php

namespace App\Http\Requests\Campania;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nombre" => ["required", "string"],
            "correo_envio" => ["required", "email"],
            "fecha_envio" => ["required", "date"],
            "medio_envio" => ["required", "numeric"],
            "link" => ["required", "url"],
            "asunto" => ["required", "string"],
            "contenido" => ["required", "string"],
            "personas" => ["nullable", "file", "mimes:xlsx,xls"],
        ];
    }
}