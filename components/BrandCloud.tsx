import { BsCloudFill } from "react-icons/bs";

interface BrandCloudProps {
    size?: number;
}

const BrandCloud: React.FC<BrandCloudProps> = ({ size = 40 }) => {
    const letterSize = Math.max(12, Math.round(size * 0.38));

    return (
        <div
            className="
                relative
                flex
                items-center
                justify-center
                drop-shadow-[0_0_14px_rgba(198,95,50,0.35)]
            "
            style={{ width: size, height: size }}
        >
            <BsCloudFill size={size} color="#c65f32" />
            <span
                className="
                    absolute
                    font-black
                    leading-none
                    text-white
                "
                style={{ fontSize: letterSize }}
            >
                B
            </span>
        </div>
    );
};

export default BrandCloud;
