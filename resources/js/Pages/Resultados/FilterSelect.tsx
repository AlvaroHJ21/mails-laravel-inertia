interface Props {
    label: string;
    options: {
        value: string | number;
        text: string;
    }[];
    value: string | number;
    onChange?: (value: string | number) => void;
}
export default function FilterSelect(props: Props) {
    const { label, options, value, onChange } = props;
    return (
        <label className="flex flex-col">
            <span className="font-bold">{label}</span>
            <select
                className="py-1 text-white border-none rounded-full outline-none min-w-32 bg-celeste-claro focus:ring-0"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </label>
    );
}
