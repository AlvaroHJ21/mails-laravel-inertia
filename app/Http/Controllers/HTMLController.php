<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TijsVerkoyen\CssToInlineStyles\CssToInlineStyles;

class HTMLController extends Controller
{
    //

    public function inline(Request $request)
    {
        $request->validate([
            'html' => 'required',
        ]);

        $html = $request->input('html');
        $css = file_get_contents(public_path("css/ckeditor.css"));

        $cssToInline = new CssToInlineStyles();

        $html = $cssToInline->convert($html,  $css);

        return response()->json([
            'html' => $html,
        ]);
    }
}
