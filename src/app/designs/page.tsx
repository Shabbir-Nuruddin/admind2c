import Image from "next/image";

export default function DesignsPage() {
  const designs = [
    { id: 1, src: "/designs/design1.jpg", title: "Tailored Trousers - Khaki", status: "Approved" },
    { id: 2, src: "/designs/design2.jpg", title: "Business Casual Top", status: "In Review" },
    { id: 3, src: "/designs/design3.jpg", title: "Sports Hybrid Pant", status: "Draft" },
    { id: 4, src: "/designs/design4.jpg", title: "Activewear Top", status: "Approved" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Designs
          </h1>
          <p className="text-zinc-500">
            Apparel concepts, sketches, and final designs.
          </p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
          Upload Design
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {designs.map((design) => (
          <div key={design.id} className="group cursor-pointer">
            <div className="aspect-[3/4] relative bg-zinc-100 rounded-xl overflow-hidden mb-4 border border-zinc-200">
              <Image
                src={design.src}
                alt={design.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-zinc-900 text-sm leading-tight mb-1">{design.title}</h3>
                <p className="text-xs text-zinc-500">Uploaded 2 days ago</p>
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${
                design.status === 'Approved' ? 'bg-green-100 text-green-700' :
                design.status === 'In Review' ? 'bg-amber-100 text-amber-700' :
                'bg-zinc-100 text-zinc-600'
              }`}>
                {design.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
