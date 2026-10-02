"use client";

import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// IMPORTANT: Update this import path to point to your initialized Firebase file
import { db, storage } from "@/lib/firebase"; 

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      let attachmentUrl = "";
      let attachmentName = "";

      // 1. Upload attachment to Firebase Storage if a file was selected
      if (file) {
        attachmentName = file.name;
        const storageRef = ref(storage, `inquiry_attachments/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        attachmentUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Write to Firestore (this triggers your Cloud Function to send the email)
      await addDoc(collection(db, "inquiries"), {
        name,
        email,
        subject,
        message,
        attachmentUrl,
        attachmentName,
        createdAt: serverTimestamp(),
      });

      alert("INQUIRY TRANSMITTED SUCCESSFULLY.");
      form.reset();
      setFile(null);
    } catch (err) {
      console.error("Transmission error:", err);
      alert("TRANSMISSION FAILED. CHECK CONSOLE LOGS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-16 font-mono">
      <h1 className="text-2xl font-bold tracking-widest uppercase mb-10 border-b-2 border-black pb-4">
        Contact / Send Inquiry
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1 gap-2">
            <label className="text-xs uppercase tracking-wider font-semibold">Your Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              className="border-2 border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label className="text-xs uppercase tracking-wider font-semibold">Your Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="border-2 border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider font-semibold">Subject</label>
          <input 
            type="text" 
            name="subject" 
            required 
            className="border-2 border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider font-semibold">Message Details</label>
          <textarea 
            name="message" 
            required 
            rows={6} 
            className="border-2 border-gray-300 p-3 text-sm focus:outline-none focus:border-black resize-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2 p-6 border-2 border-dashed border-gray-300 bg-gray-50 mt-2">
          <label className="text-xs uppercase tracking-wider font-bold">Attach File (Optional)</label>
          <p className="text-[10px] text-gray-500 mb-2 uppercase">Supported: PDF, JPG, PNG, DWG, STEP</p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.dwg,.step,.stp"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-black file:text-white file:uppercase file:tracking-wider hover:file:bg-gray-800 cursor-pointer"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-black text-white p-4 text-sm font-bold uppercase tracking-widest mt-4 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Transmitting..." : "Transmit Inquiry"}
        </button>
      </form>
    </div>
  );
}