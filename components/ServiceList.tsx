import type { ServiceItem } from "@/lib/types";

type ServiceListProps = {
  services: ServiceItem[];
};

export function ServiceList({ services }: ServiceListProps) {
  return (
    <ul className="service-list">
      {services.map((service) => (
        <li key={service.label}>{service.label}</li>
      ))}
    </ul>
  );
}
