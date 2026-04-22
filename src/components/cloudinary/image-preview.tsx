import { Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

const ImagePreview = ({ images }: { images: string[] }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <div>
            <TooltipTrigger asChild>
              <div className="h-4 w-4">
                <Eye className="h-full w-full dark:bg-black dark:text-white" />
              </div>
            </TooltipTrigger>
          </div>
          <TooltipContent>
            <span className="text-[9px] md:text-[13px]">
              Preview the image(s)
            </span>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm dark:bg-gray-600">
        <DialogHeader>
          <DialogTitle className="text-[12px] tracking-wide md:text-[15px]">
            Edit Menu Images
          </DialogTitle>
          <DialogDescription className="text-[9px] md:text-[13px]">
            Edit your Menu Images or remove it. Click 'X' to remove the image
          </DialogDescription>
        </DialogHeader>
        <Carousel className="w-full">
          <CarouselContent suppressHydrationWarning>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative p-1">
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="absolute top-2 right-2 font-bold dark:text-white"
                  >
                    X
                  </Button>
                  <Card className="flex-1 bg-orange-200 dark:bg-blue-200">
                    <CardContent className="translate flex aspect-square h-fit w-fit items-center justify-center p-6">
                      <img
                        src={image}
                        alt={`${index + 1}`}
                        className="hover:scale-75 hover:transition-all hover:duration-500"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious size={"icon-lg"} />
          <CarouselNext size={"icon-lg"} />
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}

export default ImagePreview
