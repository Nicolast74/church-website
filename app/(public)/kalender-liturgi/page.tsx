import Calendar from "@/components/kalender/Calendar";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";

export default function KalenderLiturgi() {
  return (
    <main>
      <Section isGray>
        <PageHeader title="Kalender Liturgi" />
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-4 border-amber-600">
          <Calendar />
        </div>
      </Section>
    </main>
  );
}