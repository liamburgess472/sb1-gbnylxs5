import { Badge } from "@/components/ui/badge";

interface SpecialtiesProps {
  specialties: string[];
  influencerId: string;
}

export function Specialties({ specialties, influencerId }: SpecialtiesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {specialties.slice(0, 3).map((specialty) => (
        <Badge key={`${influencerId}-${specialty}`} variant="secondary">
          {specialty}
        </Badge>
      ))}
    </div>
  );
}