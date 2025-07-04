import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { setSearchText } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Engineer",
    "Data Science",
    "Graphic Designer",
    "UI Developer",
    "Wordpress Developer",
]

export function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Carousel className="w-full max-w-xl mx-auto my-10 sm:my-16 md:my-20 px-2">
            <CarouselContent>
                {category.map((item, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className="p-1 flex justify-center">
                            <Button onClick={() => {
                                dispatch(setSearchText(item));
                                navigate("/browse");
                            }} variant="outline" className="rounded-full w-full max-w-xs text-xs sm:text-sm md:text-base">{item}</Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
