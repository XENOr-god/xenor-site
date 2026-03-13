import XenorSigil3D from "@/src/components/xenor-sigil-3d";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    // min-h-[calc(100vh-80px)] memastikan hero setinggi layar dikurangi tinggi navbar (asumsi 80px)
    // flex & items-center membuat seluruh konten persis berada di tengah secara vertikal
    <section className="section-border page-wrap flex min-h-[calc(100vh-80px)] items-center">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 lg:py-0">
        
        {/* Sistem Grid 12 Kolom untuk kontrol presisi */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* BAGIAN KIRI: Teks (Mengambil 5 kolom) */}
          <div className="flex flex-col justify-center lg:col-span-5">
            {/* Warna Cyan (#22D3EE) untuk aksen eyebrow */}
            <p className="eyebrow text-[#22D3EE]">{eyebrow}</p>
            
            {/* Menggunakan class .page-title dari globals.css agar responsif dan pakai Space Grotesk */}
            <h1 className="page-title mt-4 leading-[1.05]">
              {title}
            </h1>
            
            {/* max-w-[480px] menahan teks agar tidak terlalu panjang ke kanan (membentuk blok yang rapi) */}
            <p className="body-copy mt-6 text-lg max-w-[480px]">
              {description}
            </p>
            
            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          {/* BAGIAN KANAN: Visual 3D (Mengambil 7 kolom) */}
          <div className="relative flex w-full justify-center lg:col-span-7 lg:justify-end">
            {/* max-w-[600px] menjaga kanvas 3D tidak membesar berlebihan di layar ultra-wide */}
            <div className="w-full max-w-[600px]">
              <XenorSigil3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}