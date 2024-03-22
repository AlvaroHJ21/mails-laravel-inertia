<?php

namespace App\Http\Controllers;

use App\Helpers\ConvertHTML;
use Illuminate\Http\Request;

class HTMLController extends Controller
{
    //

    public function inline(Request $request)
    {
        $request->validate([
            'html' => 'required',
        ]);

        $html = $request->input('html');

        $html = ConvertHTML::convertCSSInline($html);

        return response()->json([
            'html' => $html,
        ]);
    }
}
