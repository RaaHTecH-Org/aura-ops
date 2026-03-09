import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Users, Shield, Wrench, LayoutGrid } from "lucide-react";

export type Persona = "all" | "ops" | "security" | "engineering";

interface PersonaToggleProps {
  value: Persona;
  onChange: (value: Persona) => void;
}

const personas = [
  { value: "all" as const, label: "All", icon: LayoutGrid },
  { value: "ops" as const, label: "Ops Lead", icon: Users },
  { value: "security" as const, label: "Security Lead", icon: Shield },
  { value: "engineering" as const, label: "Engineering Lead", icon: Wrench },
];

export default function PersonaToggle({ value, onChange }: PersonaToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as Persona)}
      className="bg-secondary/50 border border-border rounded-lg p-1 gap-0.5"
    >
      {personas.map((p) => (
        <ToggleGroupItem
          key={p.value}
          value={p.value}
          className="text-xs px-3 py-1.5 gap-1.5 data-[state=on]:bg-primary/15 data-[state=on]:text-primary rounded-md"
        >
          <p.icon className="w-3 h-3" />
          {p.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
