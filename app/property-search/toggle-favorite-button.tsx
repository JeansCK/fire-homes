"use client";

import { HeartIcon } from "lucide-react";
import { addToFavorite, removeFavorite } from "./action";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToggleFavoriteButton({ propertyId, isFavorites }: {
  propertyId: string,
  isFavorites: boolean,
}) {
  const auth = useAuth();
  const router = useRouter();
  return (
    <button className="absolute top-0 right-0 z-10 p-2 bg-white rounded-bl-lg"
      onClick={
        async () => {
          const tokenResult = await auth?.currentUser?.getIdTokenResult();
          if (!tokenResult) {
            router.push("/login");
            return;
          }
          if (isFavorites) {
            await removeFavorite(propertyId, tokenResult.token);
          } else {
            await addToFavorite(propertyId, tokenResult.token);
          }
          toast.success(`Property ${isFavorites ? "removed from" : "added to"} favorite`);
          router.refresh();
        }
      }
    >
      <HeartIcon className="text-black" fill={isFavorites ? "#db2777" : "white"} />
    </button>
  );
}