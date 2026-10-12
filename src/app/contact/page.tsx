"use client";

import React, { useState } from "react";
import { db, storage } from "@/lib/firebase"; // Adjust the import path if your file is in src/ or lib/
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = "";
      let fileName = "";

      // 1. Upload attachment to Firebase Storage if a file was selected
      if (file) {
        fileName = file.name;
        const storageRef = ref(storage, `inquiries/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Save document to Firestore inquiries collection
      await addDoc(collection(db, "inquiries"), {
        name,
        email,
        subject,
        message,
        attachmentUrl: fileUrl || null,
        attachmentName: fileName || null,
        createdAt: serverTimestamp(),
      });

      alert("INQUIRY TRANSMITTED SUCCESSFULLY.");

      // 3. Reset form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to transmit inquiry. Please check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">&gt;_ TRANSMIT_INQUIRY_FORM</h1>

      {/* --- RESTORED CONTACT INFO SECTION --- */}
      <div className="mb-8 p-4 border rounded bg-transparent">
        <h2 className="text-lg font-semibold mb-2">DIRECT CONTACT</h2>
        <p className="text-sm mb-1">
          <span className="font-bold">EMAIL: </span> 
          <a href="mailto:yourtooldesign@gmail.com" className="text-blue-500 hover:underline">
            yourtooldesign@gmail.com
          </a>
        </p>
        <p className="text-sm">
          <span className="font-bold">PHONE: </span> 
          <a href="tel:+91 9188290163" className="text-blue-500 hover:underline">
            +91 9188290163
          </a>
        </p>
      </div>
      {/* ------------------------------------- */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">YOUR NAME</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded bg-transparent"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">YOUR EMAIL</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded bg-transparent"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">SUBJECT</label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border p-2 rounded bg-transparent"
            placeholder="Project inquiry"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">MESSAGE</label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded bg-transparent"
            placeholder="Details about your tooling or design requirements..."
          />
        </div>

        <div className="border border-dashed p-4 rounded">
          <label className="block text-sm font-semibold mb-1">
            ATTACH FILE (OPTIONAL)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            SUPPORTED: PDF, JPG, PNG, DWG, STEP
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.dwg,.step,.stp"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "TRANSMITTING..." : "TRANSMIT INQUIRY ➦"}
        </button>
      </form>
    </div>
  );
}