import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";

interface Props {
    value: string;
    onChange: (value: string) => void;
    isSmall?: boolean;
}

export default function Editor(props: Props) {
    const { value, onChange, isSmall = false } = props;

    const fullConfig = {
        toolbar: {
            items: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "alignment",
                "|",
                "imageInsert",
                "blockQuote",
                "sourceEditing",
                "undo",
                "redo",
            ],
        },
        language: "es",
        image: {
            toolbar: [
                "imageTextAlternative",
                "toggleImageCaption",
                "imageStyle:inline",
                "imageStyle:block",
                "imageStyle:side",
                "linkImage",
            ],
        },
    };

    const smallConfig = {
        toolbar: {
            items: ["bold", "italic", "|", "undo", "redo"],
        },
        language: "es",
    };

    const config = isSmall ? smallConfig : fullConfig;

    return (
        <div className="h-full overflow-x-auto">
            <CKEditor
                editor={CustomEditor}
                data={value}
                config={{
                    ...config,
                    simpleUpload: {
                        uploadUrl:
                            import.meta.env.VITE_IMAGE_UPLOAD_URL ??
                            route("upload.image"),
                        headers: {
                            Accept: "application/json",
                        },
                    },
                }}
                onChange={(_, editor) => {
                    onChange(editor.getData());
                }}
            />
        </div>
    );
}
