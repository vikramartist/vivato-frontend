import { Card, CardContent, CardHeader } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

type ImageProps = {
  images: string[]
  name: string
  isPreview?: boolean
  onPreviewChange?: (open: boolean) => void
}

const ImageGrid = ({
  images,
  name,
  isPreview = false,
  onPreviewChange,
}: ImageProps) => {
  return (
    <Dialog open={isPreview} onOpenChange={onPreviewChange}>
      <div className="flex h-20 w-full">
        <DialogTrigger asChild>
          <img src={images[0]} alt={name} className="w-full" />
        </DialogTrigger>
      </div>
      <DialogContent className="w-full bg-background p-0 md:min-w-sm">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader className="flex w-full">
                      <span className="w-full items-center text-[9px] md:text-sm">
                        Menu Images
                      </span>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-4">
                      <img
                        className="h-60 w-full rounded-md shadow"
                        src={image}
                        alt={name}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <CarouselPrevious
              size={"icon-lg"}
              className="-left-3 bg-orange-600 font-bold text-white hover:bg-orange-600 hover:text-white dark:bg-gray-600 dark:hover:bg-gray-600"
            />
          )}
          {images.length > 1 && (
            <CarouselNext
              size={"icon-lg"}
              className="-right-3 bg-orange-600 text-white hover:bg-orange-600 hover:text-white dark:bg-gray-600 dark:hover:bg-gray-600"
            />
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}

export default ImageGrid
