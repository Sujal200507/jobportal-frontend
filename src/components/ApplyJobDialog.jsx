import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"

export function ApplyJobDialog({ open, setOpen }) {
    const uploadResumeRef = useRef();

    return (
        <Dialog open={open}>
            <DialogContent className="w-full max-w-xs sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Apply Job</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                        <Label htmlFor="name" className="text-left sm:text-right text-xs sm:text-sm">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Patel Mern Stack"
                            className="sm:col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                        <Label htmlFor="email" className="text-left sm:text-right text-xs sm:text-sm">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="patelmernstack@gmail.com"
                            className="sm:col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                        <Label htmlFor="number" className="text-left sm:text-right text-xs sm:text-sm">
                            Number
                        </Label>
                        <Input
                            id="number"
                            placeholder="+918080808080"
                            className="sm:col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                        <Label htmlFor="address" className="text-left sm:text-right text-xs sm:text-sm">
                            Address
                        </Label>
                        <Input
                            id="address"
                            placeholder="Address"
                            className="sm:col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                        <Label htmlFor="resume" className="text-left sm:text-right text-xs sm:text-sm">
                            Resume
                        </Label>
                        <input
                            ref={uploadResumeRef}
                            type="file"
                            accept='image/'
                            hidden
                        />
                        <p onClick={() => uploadResumeRef.current.click()} className="border text-center py-1 cursor-pointer rounded-md border-gray-200 w-full sm:col-span-3">Upload</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Send Application</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
