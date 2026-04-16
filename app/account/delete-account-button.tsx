"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { removeToken } from "@/context/action"
import { useAuth } from "@/context/auth"
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { useState } from "react"
import { toast } from "sonner";
import { deleteUserFavorites } from "./actions"

export default function DeleteAccountButton() {
  const auth = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState("");

  const handleDeleteClick = async () => {
    if (auth?.currentUser?.email) {
      setIsDeleting(true);
      try {
        await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(auth.currentUser.email, password))
        await deleteUserFavorites();
        await deleteUser(auth.currentUser);
        await removeToken();
        toast.success("Success!", {
          description: "Your account was deleted successfully",
        })
      } catch (e: any) {
        toast.error("Error!", {
          description: e.code
        })
      }
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" className="w-full">
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              This action cannot be undone. This will permanently delete you account and remove all your data from our server.
              <div>
                <Label>
                  Enter current password to continue
                </Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClick} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}