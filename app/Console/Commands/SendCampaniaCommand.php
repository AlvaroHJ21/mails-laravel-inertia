<?php

namespace App\Console\Commands;

use App\Helpers\SendCampania;
use App\Models\Campania;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendCampaniaCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-campania';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Log::info('Verificando si hay campañas para enviar...');
        //Enviamos las campañas que no han sido enviadas
        //y que tengan la fecha de envío menor o igual a la fecha actual
        Campania::where('enviado', false)
            ->where('fecha_envio', '<=', now())
            ->get()
            ->each(function ($campania) {
                Log::info('Enviando campaña: ' . $campania->id . ' ' . $campania->nombre . '...');
                SendCampania::send($campania);
            });
    }
}
