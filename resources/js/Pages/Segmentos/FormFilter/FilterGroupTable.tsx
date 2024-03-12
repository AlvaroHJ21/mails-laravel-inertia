import { UseFilter } from "./useFilter";

interface Props {
    group: UseFilter;
}

export default function FilterGroupTable(props: Props) {
    const { group } = props;

    return (
        <div className="overflow-hidden shadow-md rounded-t-md">
            <div className="px-4 py-1 text-sm font-semibold text-white bg-horizontal-gradient">
                Seleccionar {group.text}
            </div>
            <div className="overflow-y-auto max-h-60">
                {group.allFilter.map((filter) => (
                    <div
                        key={filter.id}
                        className="border-b border-b-celeste-claro"
                    >
                        <button
                            onClick={() =>
                                group.handleToggleActiveFilter(filter)
                            }
                            className={
                                "text-xs px-4 py-1 font-semibold flex items-center w-full justify-between " +
                                (group.isActiveFilter(filter) ? "active" : "")
                            }
                        >
                            {filter.text}
                            <div className="w-3 h-3 p-px border rounded-full border-azul-marino">
                                <div
                                    className={
                                        "h-full w-full border-azul-marino rounded-full " +
                                        (group.isActiveFilter(filter)
                                            ? "bg-azul-marino"
                                            : "")
                                    }
                                ></div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
