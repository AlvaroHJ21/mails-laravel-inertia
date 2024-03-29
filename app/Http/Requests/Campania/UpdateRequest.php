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
            "fecha_envio" => ["required", "date"],
            "medio_envio" => ["required", "numeric"],
            "correo_envio" => ["nullable", "email"],
            "correo_asunto" => ["nullable", "string"],
            "correo_contenido" => ["nullable", "string"],
            "whatsapp_envio" => ["nullable", "string"],
            "whatsapp_contenido" => ["nullable", "string"],
            "sms_telefono_envio" => ["nullable", "string"],
            "sms_contenido" => ["nullable", "string"],
            //
            "datos" => ["nullable", "file", "mimes:xlsx,xls"],
        ];
    }
}
