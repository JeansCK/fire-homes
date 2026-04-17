import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import { ArrowLeft, BathIcon, BedIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";
import BackButton from "./back-button";

export const dynamic = "force-static";

export default async function Property({ params }: {
  params: Promise<any>
}) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);
  const addressLines = [property.address1, property.address2, property.city, property.postcode].filter(addressLine => !!addressLine);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_500px]">
      <div>
        {!!property.images &&
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[42vh] min-h-64 sm:h-[55vh] lg:h-[80vh]">
                    <Image
                      src={`https://firebasestorage.googleapis.com/v0/b/fire-homes-5f6dd.firebasestorage.app/o/${encodeURIComponent(image)}?alt=media`}
                      alt={`image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 &&
              <>
                <CarouselPrevious className="left-4 size-10 sm:left-6 sm:size-12 lg:left-12" />
                <CarouselNext className="right-4 size-10 sm:right-6 sm:size-12 lg:right-12" />
              </>
            }
          </Carousel>
        }
        <div className="property-description mx-auto max-w-screen-md px-4 py-8 sm:px-6 sm:py-10">
          <BackButton />
          <ReactMarkdown >{property.description}</ReactMarkdown>
        </div>
      </div>
      <div className="bg-sky-200 px-4 py-6 sm:px-6 sm:py-8 lg:sticky lg:top-0 lg:h-screen lg:p-10 lg:grid lg:place-items-center">
        <div className="flex w-full flex-col gap-6 sm:gap-8 lg:gap-10">
          <PropertyStatusBadge status={property.status} className="mr-auto text-base" />
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            {addressLines.map((addressLine, index) => (
              <div key={index}>
                {addressLine}
                {index < addressLines.length - 1 && ","}
              </div>
            ))}
          </h1>
          <h2 className="text-2xl font-light sm:text-3xl">
            ${numeral(property.price).format("0,0")}
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
            <div className="flex items-center gap-2">
              <BedIcon /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex items-center gap-2">
              <BathIcon /> {property.bathrooms} Bathrooms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
