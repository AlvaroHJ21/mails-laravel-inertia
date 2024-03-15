import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor(props: Props) {
    const { value, onChange } = props;
    return (
        <div>
            <CKEditor
                editor={CustomEditor}
                data={value}
                onChange={(_, editor) => {
                    onChange(editor.getData());
                }}
            />
        </div>
    );
}
