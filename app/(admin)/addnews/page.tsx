"use client";

import NewsForm from "@/components/admin/NewsForm";
import { useRouter } from "next/navigation";

export default function AddNewsPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/newslist");
    
  };
  return <NewsForm initialData={null} onSuccess={handleSuccess} />;
}
