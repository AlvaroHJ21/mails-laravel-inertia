interface Props {
    value: number;
    show?: boolean;
}

export default function OpenRateCard(props: Props) {
    const { value, show = true } = props;
    return (
        <div
            className={
                "bg-white shadow-lg min-w-[100px] w-[100px] flex flex-col rounded-br-xl transition-opacity " +
                (show ? "" : "opacity-40")
            }
        >
            <div className="w-full h-1 bg-amarillo"></div>
            <div className="flex">
                <div className="w-1 h-full bg-azul-marino"></div>
                <div className="flex-1 py-2 text-center">
                    <span className="text-xl font-bold text-celeste-claro">
                        {show ? value : 0}%
                    </span>
                </div>
            </div>
        </div>
    );
}
