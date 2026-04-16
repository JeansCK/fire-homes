import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import NewPropertyForm from "../../new/new-property-form";
import EditPropertyForm from "./edit-property-form";
import DeletePropertyButton from "./delete-property-button";

export default async function EditProperty({ params }: {
  params: Promise<any>
}) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  return (
    <div>
      <Breadcrumbs items={[
        {
          href: "/admin-dashboard",
          label: "Dashboard",
        },
        {
          label: "Edit Property",
        },
      ]} />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex justify-between">
            Edit Property
            <DeletePropertyButton
              propertyId={property.id}
              images={property.images ?? []}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditPropertyForm
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            city={property.city}
            postcode={property.postcode}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            description={property.description}
            price={property.price}
            status={property.status}
            images={property.images || []}
          />
        </CardContent>
      </Card>
    </div>
  );
}