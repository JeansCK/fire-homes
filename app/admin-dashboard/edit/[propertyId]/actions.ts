"use server";

import { propertyDataSchema } from "@/app/validation/propertySchema";
import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { revalidatePath } from "next/cache";

export const deleteProperty = async (propertyId: string, authToken: string) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  await firestore.collection("properties").doc(propertyId).delete();
}

export const updateProperty = async (data: Property, authToken: string) => {
  const { id, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(propertyData);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  await firestore.collection("properties").doc(id).update({
    ...propertyData,
    update: new Date(),
  });

  revalidatePath(`/property/${data.id}`);

}