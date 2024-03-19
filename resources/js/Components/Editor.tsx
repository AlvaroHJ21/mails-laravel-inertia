import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor(props: Props) {
    const { value, onChange } = props;
    return (
        <div className="overflow-x-auto">
            <CKEditor
                editor={CustomEditor}
                data={value}
                onChange={(_, editor) => {
                    onChange(editor.getData());
                }}
                onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                        writer.setStyle(
                            "height",
                            "210px",
                            editor.editing.view.document.getRoot()!
                        );
                        writer.setStyle(
                            "border",
                            "1px solid #4F93FE",
                            editor.editing.view.document.getRoot()!
                        );
                    });
                }}
            />
        </div>
    );
}
