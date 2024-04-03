import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/books");
  }, [router]);
  return (
    <Layout>
      <div className="absolute inset-0 z-50 w-screen h-screen flex bg-black/50 items-center justify-center">
        <span className="text-4xl animate-spin">
          <FaSpinner />
        </span>
      </div>
    </Layout>
  );
};

export default Index;
