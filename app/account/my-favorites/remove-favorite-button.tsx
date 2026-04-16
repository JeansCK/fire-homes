"use client"

import { removeFavorite } from "@/app/property-search/action";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function RemoveFavoriteButton({ propertyId }: {
  propertyId: string
}

) {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button variant="outline" onClick={async () => {
      const tokenResult = await auth?.currentUser?.getIdTokenResult();
      if (!tokenResult) {
        return;
      }
      await removeFavorite(propertyId, tokenResult.token);
      toast.success("Success!", {
        description: "Property removed from favorites",
      })
      router.refresh();
    }}>
      <Trash2Icon />
    </Button>
  );
}