import { IBusiness } from "@/app/models/Business";
import { FormBusiness } from "./form-business";

export function BusinessOptions({
  business,
}: {
  readonly business: IBusiness[];
}) {
  return (
    <div className="space-y-4">
      {business.map((item, index) => (
        <FormBusiness key={item._id} business={item} index={index} />
      ))}
    </div>
  );
}
