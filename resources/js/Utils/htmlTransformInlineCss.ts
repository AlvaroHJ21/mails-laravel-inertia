export async function htmlTransformInlineCss(content: string) {

    const resp = await fetch("/api/html/inline", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ html: content }),
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
