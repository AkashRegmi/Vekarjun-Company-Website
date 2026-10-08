import {
  ShoppingCart, HeartPulse, GraduationCap, Landmark,
  Building2, UtensilsCrossed, Briefcase, Rocket,
} from 'lucide-react';
import { industries } from '../data/content';

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ShoppingCart, HeartPulse, GraduationCap, Landmark, Building2, UtensilsCrossed, Briefcase, Rocket,
};

export default function Industries() {
  return (
    <section id="industries" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-paper)] max-w-xl">
          Industries we work with
        </h2>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {industries.map((industry) => {
            const Icon = icons[industry.icon];
            return (
              <div key={industry.name}>
                <Icon size={20} className="text-[var(--color-blue-soft)]" />
                <h3 className="mt-4 text-base font-medium text-[var(--color-paper)]">
                  {industry.name}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--color-mist)] leading-relaxed">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
