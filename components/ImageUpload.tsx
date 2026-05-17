import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";


interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
    onChange,
    label, 
    value, 
    disabled 
}) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    },[onChange]);

    const handleDrop = useCallback((files: File[]) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            const result = event.target?.result as string;
            setBase64(result);
            handleChange(result);
        }

        reader.readAsDataURL(file);
    }, [handleChange]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
        },
    });
    return ( 
        <div
            {...getRootProps()}
            className="w-full p-20 text-center border-2 border-neutral-800 border-dashed cursor-pointer rounded-md"
        >
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image
                            src={base64}
                            height="100"
                            width="100"
                            alt="Uploaded image"
                        />
                    </div>
                ) : (
                    <p className="text-white">
                        {label}
                    </p>
                )
            }

        </div>
     );
}
 
export default ImageUpload;
