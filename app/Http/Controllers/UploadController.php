<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function image(Request $request)
    {
        $request->validate([
            "upload" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ]);

        $path = Storage::put("public/images", $request->file("upload"));

        return ["url" =>  url(Storage::url($path))];
    }
}
