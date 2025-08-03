'use client'

import { useParams, useSearchParams } from "next/navigation";
import FileUploadForm from "../../../components/FileUploadForm";

export default function Upload() {
    const searchParams = useSearchParams();
    const secretKey = searchParams.get('secretkey');
    const envsecretkey = process.env.NEXT_PUBLIC_SECRET_KEY;
    console.log("Secret Key from Params:", secretKey);
    console.log("Secret Key from Environment:", envsecretkey);

    if (envsecretkey !== secretKey) {
        return <div>Access denied</div>;
    }
    return (
        <FileUploadForm />
    )
}