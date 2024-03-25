import Loader from "@/Icons/Loader";
import Modal from "./Modal";

interface Props {
    text: string;
}

export default function LoadingModal(props: Props) {
    const { text } = props;

    return (
        <Modal show onClose={() => {}} maxWidth="xs" closeable={false}>
            <div className="p-8 text-center">
                {text}
                <div className="m-auto w-fit">
                    <Loader />
                </div>
            </div>
        </Modal>
    );
}
