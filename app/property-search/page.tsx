import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterForm from "./filter-form";
import { Suspense } from "react";
import { getProperties } from "@/data/properties";
import Image from "next/image";
import imageUrlFormatter from "@/lib/imageUrlFormatter";
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ToggleFavoriteButton from "./toggle-favorite-button";
import { getUserFavorites } from "@/data/favorites";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";

export default async function PropertySearch({
  searchParams
}: {
  searchParams: Promise<any>
}) {
  const searchParamsValues = await searchParams;

  const parsedPage = parseInt(searchParamsValues?.page);
  const parsedMinPrice = parseInt(searchParamsValues?.minPrice);
  const parsedMaxPrice = parseInt(searchParamsValues?.maxPrice);
  const parsedMinBedrooms = parseInt(searchParamsValues?.minBedrooms);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 3
    },
    filter: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ["for-sale"]
    }
  });

  const userFavorites = await getUserFavorites();

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  let verifiedToken: DecodedIdToken | null;

  if (token) {
    verifiedToken = await auth.verifyIdToken(token);
  }

  return (
    <div className="mx-auto w-full max-w-screen-lg px-4 py-4 sm:px-6 sm:py-6">
      <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl">Property Search</h1>
      <Card className="gap-4 sm:gap-6">
        <CardHeader>
          <CardTitle>
            Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <FilterForm />
          </Suspense>
        </CardContent>
      </Card>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {data.map(property => {
          const addressLine1 = [property.address1, property.address2]
            .filter(addressLine => !!addressLine)
            .join(", ");
          const addressLine2 = [property.city, property.postcode]
            .filter(addressLine => !!addressLine)
            .join(", ");
          return (
            <Card key={property.id} className="overflow-hidden pt-0">
              <CardContent className="px-0 pb-0">
                <div className="relative flex h-48 flex-col items-center justify-center bg-sky-50 text-zinc-400 sm:h-44">
                  {(!verifiedToken || !verifiedToken.admin) && (
                    <ToggleFavoriteButton isFavorites={userFavorites[property.id]} propertyId={property.id} />)}
                  {!!property.images?.[0] && (
                    <Image
                      fill
                      className="object-cover"
                      src={imageUrlFormatter(property.images[0])}
                      alt=""
                    />
                  )}
                  {!property.images?.[0] && (
                    <>
                      <HomeIcon />
                      <small>No Image</small>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-4 px-5 py-5">
                  <p className="text-base leading-7 break-words">{addressLine1}<br />{addressLine2}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <BedIcon />{property.bedrooms}
                    </div>
                    <div className="flex items-center gap-2">
                      <BathIcon />{property.bathrooms}
                    </div>
                  </div>
                  <p className="text-xl font-semibold sm:text-2xl">
                    ${numeral(property.price).format("0,0")}
                  </p>
                  <Button asChild className="w-full">
                    <Link href={`/property/${property.id}`}>
                      View Property
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 py-8 sm:py-10">
        {Array.from({ length: totalPages }).map((_, i) => {
          const newSearchParams = new URLSearchParams();

          if (searchParamsValues?.minPrice) {
            newSearchParams.set("minPrice", searchParamsValues.minPrice);
          }

          if (searchParamsValues?.maxPrice) {
            newSearchParams.set("maxPrice", searchParamsValues.maxPrice);
          }

          if (searchParamsValues?.minBedrooms) {
            newSearchParams.set("minBedrooms", searchParamsValues.minBedrooms);
          }

          newSearchParams.set("page", `${i + 1}`)

          return (
            <Button
              asChild={page !== i + 1}
              disabled={page === i + 1}
              variant="outline"
              key={i}
            >
              <Link href={`/property-search?${newSearchParams.toString()}`}>{i + 1}</Link>
            </Button>
          )
        })}
      </div>
    </div>
  );
}
