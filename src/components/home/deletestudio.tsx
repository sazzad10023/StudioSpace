import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";

import { getTokenFromClient } from "@/lib/getTokenFromclient";


const Deletestudio = ({ id }: { id: string }) => {
    const handledetele = async ()=>{
        const token = await getTokenFromClient();
        
        const res = await fetch(`http://localhost:8000/delete-studio/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }
        });
        const data = await res.json();
        console.log(data);
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={ <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        Delete
                                    </button>}>
                    Show Dialog
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handledetele}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Deletestudio;