import { Filter, FilterGroup } from "@/Interfaces/Filter";
import { UseFilter } from "./useFilter";

interface Props {
    group: UseFilter;
}

export default function FilterGroupTable(props: Props) {
    const { group } = props;

    return (
        <div className="shadow-md">
            <div className="px-4 py-2 text-white bg-azul-marino">
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
                                "text-sm px-4 flex items-center w-full justify-between " +
                                (group.isActiveFilter(filter) ? "active" : "")
                            }
                        >
                            {filter.text}
                            <div
                                className={
                                    "w-3 h-3 border border-azul-marino rounded-full " +
                                    (group.isActiveFilter(filter)
                                        ? "bg-azul-marino"
                                        : "")
                                }
                            ></div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
