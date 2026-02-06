export default function Kontak() {
  const contacts = [
    {
      name: "Pastor Paroki",
      person: "Romo Yohanes, Pr",
      email: "pastor@gereja.org",
      phone: "0812-3456-7890",
    },
    {
      name: "Sekretariat Paroki",
      person: "Ibu Maria",
      email: "sekretariat@gereja.org",
      phone: "021-123-4567",
    },
    {
      name: "Ketua Dewan Paroki",
      person: "Bapak Yosef",
      email: "dewan@gereja.org",
      phone: "0812-9876-5432",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="text-center text-black">Kontak & Kepengurusan</h1>
      </article>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contacts.map((contact, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2 text-black">{contact.name}</h2>
            <p className="text-black">{contact.person}</p>
            <p className="text-black">{contact.email}</p>
            <p className="text-black">{contact.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}