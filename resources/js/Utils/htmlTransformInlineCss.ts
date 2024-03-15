export async function htmlTransformInlineCss(content: string) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div class="ck-content">
            ${content}
            </div>
        </body>
    </html>
    `;

    const resp = await fetch("/api/html/inline", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ html }),
    });

    if (!resp.ok) {
        return {
            ok: resp.ok,
            html: "",
        };
    }

    const json = await resp.json();

    return {
        ok: resp.ok,
        html: json.html,
    };
}
