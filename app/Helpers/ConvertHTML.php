<?php

namespace App\Helpers;

use TijsVerkoyen\CssToInlineStyles\CssToInlineStyles;

class ConvertHTML
{
    static function convertCSSInline(string $html)
    {
        $css = file_get_contents(public_path("css/ckeditor.css"));

        $cssToInline = new CssToInlineStyles();

        $html = "
        <!DOCTYPE html>
        <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Document</title>
            </head>
            <body>
                <div class='ck-content'>
                $html
                </div>
            </body>
        </html>
        ";

        $html = $cssToInline->convert($html,  $css);

        return $html;
    }
}
