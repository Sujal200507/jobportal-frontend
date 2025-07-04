import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAuthUser, setLoading } from "@/redux/authSlice"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

export function UpdateProfileDialog({ open, setOpen }) {
    const { authUser, loading } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null,
    });
    const dispatch = useDispatch();

    // Sync dialog state with Redux when dialog opens
    useEffect(() => {
        if (open && authUser) {
            setInput({
                fullname: authUser.fullname || "",
                email: authUser.email || "",
                phoneNumber: authUser.phoneNumber || "",
                bio: authUser.profile?.bio || "",
                skills: authUser.profile?.skills?.join(',') || "",
                file: null,
            });
        }
    }, [open, authUser]);

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('file', input.file);
        }

        console.log("Submitting profile update with data:", {
            fullname: input.fullname,
            email: input.email,
            phoneNumber: input.phoneNumber,
            bio: input.bio,
            skills: input.skills,
            hasFile: !!input.file
        });

        try {
            dispatch(setLoading(true));
            const res = await axios.post("https://portal-x2e7.onrender.com/api/v1/user/profile/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log("Profile update response:", res.data);
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log("Profile update error:", error);
            console.log("Error response:", error.response?.data);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent className="w-full max-w-xs sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <DialogClose asChild>
                    <button
                        type="button"
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        aria-label="Close"
                        onClick={() => setOpen(false)}
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </DialogClose>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="name" className="text-left sm:text-right text-xs sm:text-sm">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeHandler}
                                className="sm:col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="email" className="text-left sm:text-right text-xs sm:text-sm">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={input.email}
                                name="email"
                                onChange={changeHandler}
                                className="sm:col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="number" className="text-left sm:text-right text-xs sm:text-sm">
                                Number
                            </Label>
                            <Input
                                id="number"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeHandler}
                                className="sm:col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="bio" className="text-left sm:text-right text-xs sm:text-sm">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                value={input.bio}
                                name="bio"
                                onChange={changeHandler}
                                className="sm:col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="skills" className="text-left sm:text-right text-xs sm:text-sm">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                value={input.skills}
                                name="skills"
                                onChange={changeHandler}
                                className="sm:col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="file" className="text-left sm:text-right text-xs sm:text-sm">
                                Resume
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                name="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="sm:col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading ? (
                                <Button>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Update</Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
