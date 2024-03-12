import FilterGroupTable from "./FilterGroupTable";
import { UseFilter } from "./useFilter";

interface Props {
    filterGroups: UseFilter[];
    resetFilters: () => void;
}

export default function FilterGroups(props: Props) {
    const { filterGroups, resetFilters } = props;
    return (
        <div className="">
            <h2 className="text-xl font-bold" hidden>
                Filtros
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
                {filterGroups.map((group) => (
                    <div key={group.text}>
                        <h3 className="mb-1 text-xl font-bold text-celeste-claro">
                            {group.text}
                        </h3>

                        {group.table ? (
                            <span>
                                <FilterGroupTable group={group} />
                            </span>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {group.allFilter.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() =>
                                            group.handleToggleActiveFilter(
                                                filter
                                            )
                                        }
                                        className={
                                            "border shadow-sm text-sm px-3 rounded-md py-0 " +
                                            (group.isActiveFilter(filter)
                                                ? "bg-azul-marino text-amarillo"
                                                : "")
                                        }
                                    >
                                        {filter.text}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={resetFilters}
                className="m-auto text-white btn bg-celeste-claro"
            >
                Reestablecer filtros
            </button>
        </div>
    );
}
