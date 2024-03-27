import bouncingSquares from "@/svg/bouncing-squares.svg";

interface Props {
    width?: number;
}

export default function LoaderBounced({ width = 60 }: Props) {
    return (
        <img src={bouncingSquares} alt="" width={width} className="m-auto" />
    );
}
