"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import {
  scanReceipt,
} from "../../services/ocrService";

import {
  createTransaction,
} from "../../services/transactionService";

export default function ReceiptScanner() {
  const [loading, setLoading] =
    useState(false);

  const [text, setText] =
    useState("");

  const [data, setData] =
    useState(null);

  async function handleUpload(e) {
    const file =
      e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      const response =
        await scanReceipt(file);

      setText(
        response.extractedText
      );

      setData(
        response.extractedData
      );

      toast.success(
        "Receipt scanned successfully"
      );
    } catch (error) {
      toast.error(
        "Failed to scan receipt"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTransaction() {
    if (!data) return;

    try {
      await createTransaction({
        type: "expense",
        category:
          data.category ||
          "Other",
        amount:
          data.amount || 0,
        description:
          data.merchant ||
          "Receipt Transaction",
      });

      toast.success(
        "Transaction created successfully"
      );
    } catch (error) {
      toast.error(
        "Failed to create transaction"
      );
    }
  }

  return (
    <div className="space-y-8">
      
      <div className="glass rounded-3xl p-6">
        
        <div className="mb-6">
          
          <h2 className="text-2xl font-bold mb-2">
            AI Receipt Scanner
          </h2>

          <p className="text-zinc-400">
            Upload receipts and automatically extract financial information
          </p>

        </div>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl p-12 cursor-pointer hover:border-cyan-400 transition-all">
          
          <div className="text-6xl mb-5">
            📄
          </div>

          <p className="text-xl font-semibold mb-2">
            Upload Receipt
          </p>

          <p className="text-zinc-400 text-center">
            JPG and PNG files supported
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

        </label>

      </div>

      {data && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass rounded-3xl p-6">
              
              <p className="text-zinc-400 mb-2">
                Merchant
              </p>

              <h3 className="text-2xl font-bold">
                {data.merchant}
              </h3>

            </div>

            <div className="glass rounded-3xl p-6">
              
              <p className="text-zinc-400 mb-2">
                Amount
              </p>

              <h3 className="text-2xl font-bold text-cyan-400">
                $
                {data.amount ||
                  "N/A"}
              </h3>

            </div>

            <div className="glass rounded-3xl p-6">
              
              <p className="text-zinc-400 mb-2">
                Category
              </p>

              <h3 className="text-2xl font-bold">
                {data.category}
              </h3>

            </div>

          </div>

          <button
            onClick={
              handleCreateTransaction
            }
            className="finova-button px-6 py-4 rounded-2xl font-semibold"
          >
            Add as Transaction
          </button>

        </div>
      )}

      <div className="glass rounded-3xl p-6">
        
        <div className="mb-5">
          
          <h3 className="text-2xl font-bold mb-2">
            OCR Extracted Text
          </h3>

          <p className="text-zinc-400">
            Raw scanned receipt content
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[260px] whitespace-pre-wrap overflow-y-auto text-zinc-300">
          {loading
            ? "Scanning receipt..."
            : text ||
              "Scanned receipt text will appear here"}
        </div>

      </div>

    </div>
  );
}