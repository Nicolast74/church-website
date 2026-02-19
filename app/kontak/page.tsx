import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

export default function Kontak() {
  const contacts = [
    {
      role: "Pastor Paroki",
      name: "Romo Yohanes, Pr",
      email: "pastor@gereja.org",
      phone: "0812-3456-7890",
    },
    {
      role: "Sekretariat Paroki",
      name: "Ibu Maria",
      email: "sekretariat@gereja.org",
      phone: "021-123-4567",
    },
    {
      role: "Ketua Dewan Paroki",
      name: "Bapak Yosef",
      email: "dewan@gereja.org",
      phone: "0812-9876-5432",
    },
  ];

  return (
    <Section>
      <PageHeader 
        title="Hubungi Kami" 
        subtitle="Informasi kontak pengurus dan sekretariat Gereja."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contacts.map((contact, index) => (
          <Card key={index} className="text-center hover:-translate-y-2 transition-transform duration-300">
            <h2 className="text-xl font-serif font-bold mb-2 text-amber-700">{contact.role}</h2>
            <p className="text-slate-900 font-semibold text-lg mb-4">{contact.name}</p>
            <div className="space-y-2 text-slate-600 text-sm">
              <p>
                <span className="font-semibold text-slate-800">Email:</span><br/>
                <a href={`mailto:${contact.email}`} className="text-amber-700 hover:text-amber-800 transition-colors">{contact.email}</a>
              </p>
              <p>
                <span className="font-semibold text-slate-800">Telepon:</span><br/>
                <a href={`tel:${contact.phone}`} className="text-slate-600 hover:text-amber-700 transition-colors">{contact.phone}</a>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}