"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { UploadSimple, Spinner } from "@phosphor-icons/react/dist/ssr";
import { Design, subscribeToDesigns, uploadDesign } from "@/lib/db";

export default function DesignsPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToDesigns((data) => {
      setDesigns(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: prompt for a title
    const title = prompt("Enter a title for this design:") || "Untitled Design";
    
    try {
      setUploading(true);
      await uploadDesign(file, title);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload design. Check console for details.");
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-12 relative">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Designs
          </h1>
          <p className="text-zinc-500">
            Apparel concepts, sketches, and final designs.
          </p>
        </div>
        
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
        />
        
        <button 
          onClick={handleUploadClick}
          disabled={uploading}
          className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {uploading ? (
            <Spinner className="w-4 h-4 animate-spin" />
          ) : (
            <UploadSimple className="w-4 h-4" />
          )}
          {uploading ? "Uploading..." : "Upload Design"}
        </button>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-zinc-400">Loading designs...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {designs.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500 border border-dashed border-zinc-200 rounded-xl">
              No designs uploaded yet. Click 'Upload Design' to add one.
            </div>
          )}
          
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
                  <p className="text-xs text-zinc-500">Uploaded recently</p>
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
      )}
    </div>
  );
}
