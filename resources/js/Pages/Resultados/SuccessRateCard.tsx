interface Props {
    value: number;
}

export default function SuccessRateCard(props: Props) {
    const { value } = props;

    const show = value > 0;

    return (
        <div
            className={
                "bg-white shadow-lg min-w-[100px] w-[100px] flex flex-col rounded-tr-xl transition-opacity " +
                (show ? "" : "opacity-40")
            }
        >
            <div className="flex">
                <div className="w-1 h-full bg-celeste-claro"></div>
                <div className="flex-1 py-2 text-center">
                    <span className="text-xl font-bold">
                        {show ? value : 0}%
                    </span>
                </div>
            </div>
            <div className="w-full h-1 bg-amarillo"></div>
        </div>
    );
}
